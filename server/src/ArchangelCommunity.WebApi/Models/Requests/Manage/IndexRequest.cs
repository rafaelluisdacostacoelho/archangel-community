using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace ArchangelCommunity.WebApi.Models.Requests.Manage
{
    /// <summary>
    /// 
    /// </summary>
    public class IndexRequest
    {
        /// <summary>
        /// 
        /// </summary>
        public bool HasPassword { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public IList<UserLoginInfo> Logins { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string PhoneNumber { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool TwoFactor { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool BrowserRemembered { get; set; }
    }
}
