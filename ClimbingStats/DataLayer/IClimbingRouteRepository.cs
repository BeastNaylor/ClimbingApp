using ClimbingStats.Models;
using ClimbingStats.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbingStats.DataLayer
{
    public interface IClimbingRouteRepository
    {
        Task<IEnumerable<Route>> GetAllRoutes();
        Task<IEnumerable<Route>> GetRoutes(Section section);
        Task InsertRoute(AddRouteDto route);
        Task ClearRoutes(Section section);
    }
}
