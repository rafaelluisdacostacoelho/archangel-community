using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace ArchangelCommunity.WebApi.Models.Requests.Manage
{
    /// <summary>
    /// 
    /// </summary>
    public class ConfigureTwoFactorRequest
    {
        /// <summary>
        /// 
        /// </summary>
        public string SelectedProvider { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public ICollection<SelectListItem> Providers { get; set; }
    }
}
