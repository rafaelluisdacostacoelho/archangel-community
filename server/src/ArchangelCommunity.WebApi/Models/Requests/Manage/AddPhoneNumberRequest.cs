using System.ComponentModel.DataAnnotations;

namespace ArchangelCommunity.WebApi.Models.Requests.Manage
{
    /// <summary>
    /// 
    /// </summary>
    public class AddPhoneNumberRequest
    {
        /// <summary>
        /// 
        /// </summary>
        [Required]
        [Phone]
        [Display(Name = "Phone number")]
        public string PhoneNumber { get; set; }
    }
}
