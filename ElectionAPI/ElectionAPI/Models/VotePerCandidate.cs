using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAPI.Models
{
    public class VotePerCandidate
    {
        public string CandidateName { get; set; }
        public int VotesCount { get; set; }
        public Decimal Percent { get; set; }
    }
}