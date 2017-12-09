using System.Collections.Generic;

namespace ArchangelCommunity.WebApi.Services.SendGrid
{
    /// <summary>
    /// 
    /// </summary>
    public class SendGridPersonalization
    {
        /// <summary>
        /// 
        /// </summary>
        public List<SendGridEmail> To { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Subject { get; set; }
    }
}
