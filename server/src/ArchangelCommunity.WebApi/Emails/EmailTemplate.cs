namespace ArchangelCommunity.WebApi.Emails
{
    /// <summary>
    /// 
    /// </summary>
    public sealed class EmailTemplate
    {
        /// <summary>
        /// 
        /// </summary>
        private string _name;
        /// <summary>
        /// 
        /// </summary>
        private string _path = "Templates";

        /// <summary>
        /// 
        /// </summary>
        /// <param name="name"></param>
        private EmailTemplate(string name)
        {
            _name = $"{_path}/{name}";
        }

        /// <summary>
        /// 
        /// </summary>
        public static EmailTemplate EMAIL_CONFIRMATION = new EmailTemplate("email-confirmation.html");

        /// <summary>
        /// 
        /// </summary>
        public static EmailTemplate RESET_PASSWORD = new EmailTemplate("reset-password.html");

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return _name;
        }
    }
}
