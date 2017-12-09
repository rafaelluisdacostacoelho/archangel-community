using ArchangelCommunity.WebApi.Emails;
using ArchangelCommunity.WebApi.Services.SendGrid;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace ArchangelCommunity.WebApi.Services
{
    /// <summary>
    /// 
    /// </summary>
    public class SendGridService : IEmailService
    {
        private readonly ILogger _logger;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        /// <param name="loggerFactory"></param>
        public SendGridService(IOptions<SendGridOptions> options, ILoggerFactory loggerFactory)
        {
            Options = options.Value;
            _logger = loggerFactory.CreateLogger<SendGridService>();
        }

        /// <summary>
        /// 
        /// </summary>
        public SendGridOptions Options { get; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <param name="subject"></param>
        /// <param name="parameters"></param>
        /// <param name="template"></param>
        /// <returns></returns>
        public async Task SendEmailAsync
        (
            SendGridEmail from,
            SendGridEmail to,
            string subject,
            Dictionary<string, string> parameters,
            EmailTemplate template
        )
        {
            try
            {
                HttpClient client = new HttpClient();

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Options.Key);
                client.BaseAddress = new Uri("https://api.sendgrid.com/v3/");
                
                var html = EmailWrapper.CreateEmailBody(parameters, template);

                if (html == null)
                    throw new Exception($"Template {template.ToString()} not found.");

                var message = new SendGridMessage(to, from, subject, html);

                string json = JsonConvert.SerializeObject(message);

                // Sending JSON to the API is as easy as a single line of code:
                var response = await client.PostAsync("mail/send", new StringContent(json, Encoding.UTF8, "application/json"));

                // This is just a rough example of handling errors
                if (!response.IsSuccessStatusCode)
                {
                    // See if we can read the response for more information, then log the error
                    string errorJson = await response.Content.ReadAsStringAsync();
                    throw new Exception($"SendGrid indicated failure, code: {response.StatusCode}, reason: {errorJson}");
                }
            }
            catch (Exception exception)
            {
                _logger.LogError(eventId: new EventId(0), exception: exception, message: exception.Message);
            }
        }
    }
}