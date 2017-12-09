using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using Twilio.Clients;

namespace ArchangelCommunity.WebApi.Services
{
    /// <summary>
    /// 
    /// </summary>
    public class TwilioService: ISmsService
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        public TwilioService(IOptions<TwilioOptions> options)
        {
            Options = options.Value;
        }

        /// <summary>
        /// 
        /// </summary>
        public TwilioOptions Options { get; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="toPhoneNumber"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public Task SendSmsAsync(string toPhoneNumber, string message)
        {
            var twilio = new TwilioRestClient(Options.AccountSID, Options.AuthToken);

            // var result = twilio.SendMessage(Options.SendNumber, number, message);
            // Use the debug output for testing without receiving a SMS message.
            // Remove the Debug.WriteLine(message) line after debugging.
            // System.Diagnostics.Debug.WriteLine(message);

            return Task.FromResult(0);
        }
    }
}
