using ClimbingStats.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbingStats
{
    public interface IClimbingRouteRepository
    {
        IEnumerable<Route> GetRoutes();
        void InsertRoute(Route route);
    }
}
