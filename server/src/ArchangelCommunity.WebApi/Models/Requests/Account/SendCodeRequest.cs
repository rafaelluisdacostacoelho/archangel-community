using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace ArchangelCommunity.WebApi.Models.Requests.Account
{
    /// <summary>
    /// 
    /// </summary>
    public class SendCodeRequest
    {
        /// <summary>
        /// 
        /// </summary>
        public string SelectedProvider { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public ICollection<SelectListItem> Providers { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string ReturnUrl { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool RememberMe { get; set; }
    }
}
