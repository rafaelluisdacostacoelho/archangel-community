using ArchangelCommunity.WebApi.Emails;
using ArchangelCommunity.WebApi.Services.SendGrid;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArchangelCommunity.WebApi.Services
{
    /// <summary>
    /// 
    /// </summary>
    public interface IEmailService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="from"></param>
        /// <param name="to"></param>
        /// <param name="subject"></param>
        /// <param name="parameters"></param>
        /// <param name="templateName"></param>
        /// <returns></returns>
        Task SendEmailAsync
        (
            SendGridEmail from,
            SendGridEmail to,
            string subject,
            Dictionary<string, string> parameters,
            EmailTemplate templateName
        );
    }
}
