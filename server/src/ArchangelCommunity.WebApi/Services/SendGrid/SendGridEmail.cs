namespace ArchangelCommunity.WebApi.Services.SendGrid
{
    /// <summary>
    /// 
    /// </summary>
    public class SendGridEmail
    {
        /// <summary>
        /// 
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public SendGridEmail() { }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="email"></param>
        /// <param name="name"></param>
        public SendGridEmail(string email, string name = null)
        {
            this.Email = email;
            this.Name = name;
        }
    }
}
