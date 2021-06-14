using ElectionAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ElectionAPI.Repositories
{
    public class VoteRepository : IRepository<Vote>
    {
        private readonly ElectionDbContext DbContext;

        public VoteRepository(ElectionDbContext electionDbContext)
        {
            this.DbContext = electionDbContext;
        }

        private void SaveChanges() {
            DbContext.SaveChanges();
        }

        public void Add(Vote obj)
        {
            if (DbContext.Candidates.Where(x => x.CandidateID == obj.CandidateID).FirstOrDefault() == null)
                throw new CustomMessageException("Não foi possível idenficar o candidato selecionado");

            var exist = DbContext.Votes.Where(x => x.CandidateID == obj.CandidateID).FirstOrDefault();
            if (exist != null)
            {
                exist.Count+=1;
                DbContext.Votes.Update(exist);
            }
            else
            {
                obj.Count = 1;
                DbContext.Votes.Add(obj);
            }
            SaveChanges();
        }
        
        public void Update(Vote obj)
        {
            DbContext.Votes.Update(obj);
            SaveChanges();
        }

        public void Delete(Vote obj)
        {
            DbContext.Votes.Remove(obj);
            SaveChanges();
        }

        public IEnumerable<Vote> Get() =>
            DbContext.Votes.ToList();

        public IEnumerable<Vote> Get(Func<Vote, bool> predicate) =>
            DbContext.Votes.Where(predicate);
    }
}
