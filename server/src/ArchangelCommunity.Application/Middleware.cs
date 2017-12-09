using ArchangelCommunity.Application.Security;
using Microsoft.Extensions.DependencyInjection;

namespace ArchangelCommunity.Application
{
    public class Middleware
    {
        public Middleware()
        {
            // Setup your DI
            new ServiceCollection()
                .AddLogging()
                .AddSingleton<IAuthenticationService>()
                .BuildServiceProvider();
        }
    }
}
