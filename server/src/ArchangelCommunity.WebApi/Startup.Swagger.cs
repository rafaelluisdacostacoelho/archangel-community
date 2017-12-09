using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Swashbuckle.Swagger.Model;
using System.IO;

namespace ArchangelCommunity.WebApi
{
    public partial class Startup
    {
        private void ConfigureSwagger(IServiceCollection services)
        {
            // Inject an implementation of ISwaggerProvider with defaulted settings applied
            services.AddSwaggerGen();

            services.ConfigureSwaggerGen(options =>
            {
                options.SingleApiVersion(new Info
                {
                    Version = "v1",
                    Title = "Archangel Community API V1",
                    Description = "Microsoft ASP.NET Core Web API",
                    TermsOfService = "None"
                });

                // Determine base path for the application.
                var basePath = PlatformServices.Default.Application.ApplicationBasePath;

                // Set the comments path for the swagger json and ui.
                var xmlPath = Path.Combine(basePath, "ArchangelCommunity.WebApi.xml");
                options.IncludeXmlComments(xmlPath);
            });
        }
    }
}
