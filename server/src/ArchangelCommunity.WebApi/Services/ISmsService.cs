using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArchangelCommunity.WebApi.Services
{
    /// <summary>
    /// 
    /// </summary>
    public interface ISmsService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="toPhoneNumber"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        Task SendSmsAsync(string toPhoneNumber, string message);
    }
}
