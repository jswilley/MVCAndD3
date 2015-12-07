using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace D3Application.Models
{
    public class InOutDTO
    {
        public string Aggregate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<KeyValuePair<DateTime,int>> InHistory { get; set; }
        public List<KeyValuePair<DateTime, int>> OutHistory { get; set; }
        public int MinCount { get; set; }
        public int MaxCount { get; set; }
    }
}