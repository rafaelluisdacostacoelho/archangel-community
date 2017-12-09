using System.Collections.Generic;

namespace ArchangelCommunity.WebApi.Services.SendGrid
{
    /// <summary>
    /// 
    /// </summary>
    public class SendGridMessage
    {
        /// <summary>
        /// 
        /// </summary>
        public const string TYPE_TEXT = "text";

        /// <summary>
        /// 
        /// </summary>
        public const string TYPE_HTML = "text/html";

        /// <summary>
        /// 
        /// </summary>
        public List<SendGridPersonalization> Personalizations { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public SendGridEmail From { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public List<SendGridContent> Content { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public SendGridMessage() { }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <param name="subject"></param>
        /// <param name="message"></param>
        /// <param name="type"></param>
        public SendGridMessage(SendGridEmail from, SendGridEmail to, string subject, string message, string type = TYPE_HTML)
        {
            Personalizations = new List<SendGridPersonalization>
            {
                new SendGridPersonalization {
                    To = new List<SendGridEmail> { to },
                    Subject = subject
                }
            };
            From = from;
            Content = new List<SendGridContent>
            {
                new SendGridContent(type, message)
            };
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <param name="subject"></param>
        /// <param name="message"></param>
        /// <param name="type"></param>
        public SendGridMessage(SendGridEmail from, List<SendGridEmail> to, string subject, string message, string type = TYPE_HTML)
        {
            Personalizations = new List<SendGridPersonalization>
            {
                new SendGridPersonalization {
                    To =  to,
                    Subject = subject
                }
            };
            From = from;
            Content = new List<SendGridContent>
            {
                new SendGridContent(type, message)
            };
        }
    }
}
