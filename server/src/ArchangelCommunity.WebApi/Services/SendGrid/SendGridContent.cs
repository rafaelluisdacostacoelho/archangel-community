namespace ArchangelCommunity.WebApi.Services.SendGrid
{
    /// <summary>
    /// 
    /// </summary>
    public class SendGridContent
    {
        /// <summary>
        /// 
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public SendGridContent() { }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="type"></param>
        /// <param name="content"></param>
        public SendGridContent(string type, string content)
        {
            Type = type;
            Value = content;
        }
    }
}
