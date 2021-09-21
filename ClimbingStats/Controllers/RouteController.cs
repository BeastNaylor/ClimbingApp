using ClimbingStats.Models;
using ClimbingStats.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClimbingStats.DataLayer;

namespace ClimbingStats.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

        [HttpGet("sections")]
        public IEnumerable<Section> GetAllSections()
        {
            return Enum.GetValues<Section>();
        }

        [HttpGet("colours")]
        public IEnumerable<Colour> GetAllColours()
        {
            return Enum.GetValues<Colour>();
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
