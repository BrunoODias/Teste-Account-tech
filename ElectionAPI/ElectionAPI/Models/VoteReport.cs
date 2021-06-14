using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectionAPI.Models
{
    public class VoteReport
    {
        public VoteReport()
        {
            VotesPerCandidate = new List<VotePerCandidate>();
        }
        public int TotalCount { get; set; }
        public List<VotePerCandidate> VotesPerCandidate { get; set; }

        internal void SetTotalCount(int value)
        {
            this.TotalCount = value;

            foreach (var current in VotesPerCandidate)
            {
                current.Percent = (current.VotesCount * 100 / value);
            }
        }
    }
}
