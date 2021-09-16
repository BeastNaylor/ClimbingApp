using ClimbingStats.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbingStats.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RouteController : ControllerBase
    {
        private readonly IClimbingRouteRepository _climbingRouteRepository;

        public RouteController(IClimbingRouteRepository climbingRouteRepository)
        {
            _climbingRouteRepository = climbingRouteRepository;
        }

        [HttpGet]
        public IEnumerable<Route> Get()
        {
            _climbingRouteRepository.InsertRoute(new Route() { Colour = "Black", Position = 1, Section = "Cafe" });
            return _climbingRouteRepository.GetRoutes();
        }
    }
}
