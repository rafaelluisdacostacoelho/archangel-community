using System.ComponentModel.DataAnnotations;

namespace ArchangelCommunity.WebApi.Models.Requests.Manage
{
    /// <summary>
    /// 
    /// </summary>
    public class VerifyPhoneNumberRequest
    {
        /// <summary>
        /// 
        /// </summary>
        [Required]
        public string Code { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        [Phone]
        [Display(Name = "Phone number")]
        public string PhoneNumber { get; set; }
    }
}
