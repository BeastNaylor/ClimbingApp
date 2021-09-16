using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbingStats
{
    partial class Startup
    {
        public void SetupIoc(IServiceCollection services)
        {
            services.AddScoped<IClimbingRouteRepository, ClimbingRouteRepository>();
        }
    }
}
