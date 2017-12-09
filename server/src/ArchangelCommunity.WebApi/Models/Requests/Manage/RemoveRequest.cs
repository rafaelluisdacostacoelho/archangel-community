namespace ArchangelCommunity.WebApi.Models.Requests.Manage
{
    /// <summary>
    /// 
    /// </summary>
    public class RemoveLoginRequest
    {
        /// <summary>
        /// 
        /// </summary>
        public string LoginProvider { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string ProviderKey { get; set; }
    }
}
