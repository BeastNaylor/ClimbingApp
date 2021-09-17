using ClimbingStats.Models.Enums;
using System;

namespace ClimbingStats.Models
{
    public class AddRouteDto
    {
        public Colour Colour { get; set; }
        public Section Section { get; set; }
        public int Position { get; set; }
    }
}
