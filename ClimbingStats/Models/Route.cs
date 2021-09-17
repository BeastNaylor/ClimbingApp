using ClimbingStats.Models.Enums;
using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ClimbingStats.Models
{
    public class Route
    {
        public int ID { get; set; }
        public Colour Colour { get; set; }
        public Section Section { get; set; }
        public int Position {get; set;}
        public DateTime DateAdded { get; set; }
        public bool IsActive {get; set; }
    }
}
