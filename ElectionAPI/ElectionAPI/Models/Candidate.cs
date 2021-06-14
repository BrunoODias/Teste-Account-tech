using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAPI.Models
{
    public class Candidate
    {
        public int CandidateID { get; set; }
        public string Name { get; set; }
        public string Vice { get; set; }
        public string Affiliation { get; set; }
        public int Legend { get; set; }
        public DateTime InsertData { get; set; }
    }
}
