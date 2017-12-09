using ArchangelCommunity.Identity.Infrastructure.CrossCutting.Responses.Account;
using ArchangelCommunity.WebApi.Emails;
using ArchangelCommunity.WebApi.Models.Requests.Account;
using ArchangelCommunity.WebApi.Services;
using ArchangelCommunity.WebApi.Services.SendGrid;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ArchangelCommunity.WebApi.Controllers.Security
{
    /// <summary>
    /// Account Controller
    /// </summary>
    [Authorize]
    // [RequireHttps]
    [Route("api/accounts")]
    public class AccountController : Controller
    {
        private UserManager<IdentityUser> UserManager { get; }
        private SignInManager<IdentityUser> SignInManager { get; }
        private readonly IEmailService EmailSender;
        private readonly ISmsService SmsSender;
        private readonly ILogger Logger;

        /// <summary>
        /// Account constructor
        /// </summary>
        /// <param name="userManager">UserManager injection</param>
        /// <param name="signInManager">SignInManager injection</param>
        /// <param name="emailSender">EmailSender injection</param>
        /// <param name="smsSender">SmsSender injection</param>
        /// <param name="loggerFactory">LoggerFactory injection</param>
        public AccountController
        (
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IEmailService emailSender,
            ISmsService smsSender,
            ILoggerFactory loggerFactory
        )
        {
            UserManager = userManager;
            SignInManager = signInManager;
            EmailSender = emailSender;
            SmsSender = smsSender;
            Logger = loggerFactory.CreateLogger<AccountController>();
        }

        /// <summary>
        /// Verifies that the user has permission to access the system and keeps it authenticated.
        /// </summary>
        /// <param name="model">User credentials</param>
        /// <returns>Informations about authenticated user</returns>
        [HttpPost("sign-in")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(SignInResponse), 200)]
        public async Task<IActionResult> SignIn([FromBody, Required]SigInRequest model)
        {
            if (ModelState.IsValid)
            {
                // Require the user to have a confirmed email before they can log on.
                var user = await UserManager.FindByNameAsync(model.Email);

                if (user != null)
                {
                    if (!await UserManager.IsEmailConfirmedAsync(user))
                    {
                        ModelState.AddModelError(string.Empty, "You must have a confirmed email to sign in.");

                        return BadRequest(ModelState);
                    }
                }

                var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    Logger.LogInformation(1, "User signed in.");

                    var response = new SignInResponse
                    {
                        Name = user.NormalizedUserName,
                        RequiresTwoFactor = result.RequiresTwoFactor
                    };

                    return Ok(response);
                }
            }

            ModelState.AddModelError(string.Empty, "Invalid login attempt.");

            return BadRequest(ModelState);
        }

        /// <summary>
        /// Register a new user.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>Http code that representing a state of the same.</returns>
        [HttpPost("register")]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ModelStateDictionary), 400)]
        public async Task<IActionResult> Register([FromBody, Required]RegisterRequest model)
        {
            if (ModelState.IsValid)
            {
                var user = new IdentityUser
                {
                    UserName = model.Email,
                    Email = model.Email
                };

                var result = await UserManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    var code = await UserManager.GenerateEmailConfirmationTokenAsync(user);
                    try
                    {
                        var url = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);

                        var from = new SendGridEmail("rafael@archangelcommunity.com", "Rafael");
                        var to = new SendGridEmail(model.Email, model.Name);

                        var parameters = new Dictionary<string, string>();

                        parameters.Add("{name}", to.Name);
                        parameters.Add("{link}", url);

                        await EmailSender.SendEmailAsync(from, to, "Confirm your account", parameters, EmailTemplate.EMAIL_CONFIRMATION);
                        await SignInManager.SignInAsync(user, isPersistent: false);

                        Logger.LogInformation(3, "User created a new account with password.");

                        return Ok();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                }
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return BadRequest(ModelState);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost("sign-out")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SignOut()
        {
            await SignInManager.SignOutAsync();
            Logger.LogInformation(4, "User logged out.");

            return Ok();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="provider"></param>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [HttpPost("external-sign-in")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ChallengeResult), 200)]
        public IActionResult ExternalSignIn(string provider, string returnUrl = null)
        {
            // Request a redirect to the external login provider.
            var redirectUrl = Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl });
            var properties = SignInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);

            return Challenge(properties, provider);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="returnUrl"></param>
        /// <param name="remoteError"></param>
        /// <returns></returns>
        [HttpGet("external-sign-in-callback")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ExternalLoginConfirmationRequest), 200)]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                ModelState.AddModelError(string.Empty, $"Error from external provider: {remoteError}");
                return BadRequest(ModelState);
            }
            var info = await SignInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                // Redirect user to sign in
                return Ok();
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await SignInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
            if (result.Succeeded)
            {
                Logger.LogInformation(5, "User logged in with {Name} provider.", info.LoginProvider);
                
                return Ok();
            }
            if (result.RequiresTwoFactor)
            {
                // return RedirectToAction(nameof(SendCode), new { ReturnUrl = returnUrl });
                return BadRequest();
            }
            if (result.IsLockedOut)
            {
                // return View("Lockout");
                return BadRequest();
            }
            else
            {
                // If the user does not have an account, then ask the user to create an account.
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                return Ok(new ExternalLoginConfirmationRequest { Email = email });
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [HttpPost("external-login-confirmation")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationRequest model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await SignInManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new IdentityUser { UserName = model.Email, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user, info);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false);
                        Logger.LogInformation(6, "User created an account using {Name} provider.", info.LoginProvider);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewData["ReturnUrl"] = returnUrl;
            return View(model);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpGet("confirm-email/{userId}/{code}")]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return View("Error");
            }
            var user = await UserManager.FindByIdAsync(userId);
            if (user == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(user, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // POST: /Account/ForgotPassword
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("forgot-password")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPassword([FromBody]ForgotPasswordRequest model)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return View("ForgotPasswordConfirmation");
                }

                // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
                // Send an email with this link
                //var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                //var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
                //await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                //   $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
                //return View("ForgotPasswordConfirmation");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // POST: /Account/ResetPassword
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("reset-password")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                // return RedirectToAction(nameof(AccountController.ResetPasswordConfirmation), "Account");
                return Ok();
            }
            var result = await UserManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                // return RedirectToAction(nameof(AccountController.ResetPasswordConfirmation), "Account");
                return Ok();
            }
            AddErrors(result);
            return View();
        }

        //
        // GET: /Account/SendCode
        /// <summary>
        /// 
        /// </summary>
        /// <param name="returnUrl"></param>
        /// <param name="rememberMe"></param>
        /// <returns></returns>
        [HttpGet("send-code")]
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl = null, bool rememberMe = false)
        {
            var user = await SignInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(user);
            var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
            // return View(new SendCodeRequest { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
            return Ok(new SendCodeRequest { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/SendCode
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("send-code")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SendCode(SendCodeRequest model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var user = await SignInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                return View("Error");
            }

            // Generate the token and send it
            var code = await UserManager.GenerateTwoFactorTokenAsync(user, model.SelectedProvider);
            if (string.IsNullOrWhiteSpace(code))
            {
                return View("Error");
            }

            var message = "Your security code is: " + code;
            if (model.SelectedProvider == "Email")
            {
                // await EmailSender.SendEmailAsync("robot@archangelcommunity.com", "Archangel Community Robot", await UserManager.GetEmailAsync(user), "Security Code", message);
            }
            else if (model.SelectedProvider == "Phone")
            {
                await SmsSender.SendSmsAsync(await UserManager.GetPhoneNumberAsync(user), message);
            }

            // return RedirectToAction(nameof(VerifyCode), new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
            return Ok();
        }

        //
        // GET: /Account/VerifyCode
        /// <summary>
        /// 
        /// </summary>
        /// <param name="provider"></param>
        /// <param name="rememberMe"></param>
        /// <param name="returnUrl"></param>
        /// <returns></returns>
        [HttpGet("verify-code")]
        [AllowAnonymous]
        public async Task<IActionResult> VerifyCode(string provider, bool rememberMe, string returnUrl = null)
        {
            // Require that the user has already logged in via username/password or external login
            var user = await SignInManager.GetTwoFactorAuthenticationUserAsync();
            if (user == null)
            {
                return View("Error");
            }
            return View(new VerifyCodeRequest { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        //
        // POST: /Account/VerifyCode
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("verify-code")]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> VerifyCode(VerifyCodeRequest model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes.
            // If a user enters incorrect codes for a specified amount of time then the user account
            // will be locked out for a specified amount of time.
            var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, model.RememberMe, model.RememberBrowser);
            if (result.Succeeded)
            {
                return RedirectToLocal(model.ReturnUrl);
            }
            if (result.IsLockedOut)
            {
                Logger.LogWarning(7, "User account locked out.");
                return View("Lockout");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Invalid code.");
                return View(model);
            }
        }

        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private Task<IdentityUser> GetCurrentUserAsync()
        {
            return UserManager.GetUserAsync(HttpContext.User);
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                // return RedirectToAction(nameof(HomeController.Index), "Home");
                return Ok();
            }
        }

        #endregion
    }
}