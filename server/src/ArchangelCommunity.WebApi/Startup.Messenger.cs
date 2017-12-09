using ArchangelCommunity.WebApi.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ArchangelCommunity.WebApi
{
    /// <summary>
    /// 
    /// </summary>
    public partial class Startup
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureMessenger(IServiceCollection services)
        {
            services.AddTransient<IEmailService, SendGridService>();
            services.Configure<SendGridOptions>(options => Configuration.GetSection("SendGrid").Bind(options));

            services.AddTransient<ISmsService, TwilioService>();
            services.Configure<TwilioOptions>(options => Configuration.GetSection("Twilio").Bind(options));
        }
    }
}
