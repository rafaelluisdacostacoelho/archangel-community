using System.ComponentModel.DataAnnotations;

namespace ArchangelCommunity.WebApi.Models.Requests.Account
{
    /// <summary>
    /// 
    /// </summary>
    public class VerifyCodeRequest
    {
        /// <summary>
        /// 
        /// </summary>
        [Required]
        public string Provider { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public string Code { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string ReturnUrl { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "Remember this browser?")]
        public bool RememberBrowser { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
}
