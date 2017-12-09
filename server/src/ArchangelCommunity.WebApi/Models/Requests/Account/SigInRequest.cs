using System.ComponentModel.DataAnnotations;

namespace ArchangelCommunity.WebApi.Models.Requests.Account
{
    /// <summary>
    /// 
    /// </summary>
    public class SigInRequest
    {
        /// <summary>
        /// 
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        public bool RememberMe { get; set; }
    }
}
