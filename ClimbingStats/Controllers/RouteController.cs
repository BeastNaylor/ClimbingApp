using ClimbingStats.Models;
using ClimbingStats.Models.Enums;
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
        public async Task<IEnumerable<Route>> GetAllRoutes()
        {
            var routes = await _climbingRouteRepository.GetAllRoutes();
            return routes;
        }

        [HttpGet("{section}")]
        public async Task<IEnumerable<Route>> GetRoutesForSection(Section section)
        {
            return await _climbingRouteRepository.GetRoutes(section);
        }


        [HttpPost("add")]
        public async Task AddRoute([FromBody]AddRouteDto routeToAdd)
        {
            await _climbingRouteRepository.InsertRoute(routeToAdd);
        }

        [HttpPost("clear/{section}")]
        public async Task ClearRoutesFromSection(Section section)
        {
            await _climbingRouteRepository.ClearRoutes(section);
        }
    }
}
