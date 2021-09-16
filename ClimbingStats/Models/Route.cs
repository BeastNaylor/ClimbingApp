using System;

namespace ClimbingStats.Models
{
    public class Route
    {
        public int ID { get; set; }
        public string Colour { get; set; }
        public string Section { get; set; }
        public int Position {get; set;}
        public DateTime DateAdded { get; set; }
        public bool IsActive {get; set; }
    }
}
