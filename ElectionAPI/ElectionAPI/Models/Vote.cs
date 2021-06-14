using System.ComponentModel.DataAnnotations;

namespace ElectionAPI.Models
{
    public class Vote
    {
        [Key]
        public int VoteID { get; set; }
        public virtual Candidate Candidate { get; set; }
        public int CandidateID { get; set; }
        public int Count { get; set; }
    }
}
