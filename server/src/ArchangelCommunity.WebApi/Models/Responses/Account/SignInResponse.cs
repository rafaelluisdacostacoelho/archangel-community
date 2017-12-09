using System.ComponentModel.DataAnnotations;

namespace ArchangelCommunity.Identity.Infrastructure.CrossCutting.Responses.Account
{
    /// <summary>
    /// 
    /// </summary>
    public class SignInResponse
    {
        /// <summary>
        /// 
        /// </summary>
        [Required]
        public string Name { get; set; }
        
        /// <summary>
        /// 
        /// </summary>
        public byte[] Avatar { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Required]
        public bool RequiresTwoFactor { get; set; }
    }
}
