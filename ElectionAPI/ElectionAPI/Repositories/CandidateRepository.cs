using ElectionAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ElectionAPI.Repositories
{
    public class CandidateRepository : IRepository<Candidate>
    {
        private readonly ElectionDbContext DbContext;

        public CandidateRepository(ElectionDbContext electionDbContext)
        {
            this.DbContext = electionDbContext;
        }

        private void SaveChanges()
        {
            DbContext.SaveChanges();
        }

        public void Add(Candidate obj)
        {
            if (obj.Legend > 99 || obj.Legend < 10 || string.IsNullOrWhiteSpace(obj.Name) || string.IsNullOrWhiteSpace(obj.Vice) || string.IsNullOrWhiteSpace(obj.Affiliation))
                throw new CustomMessageException("Os parâmetros informados são inválidos");

            if (DbContext.Candidates.Where(x => x.Legend == obj.Legend).FirstOrDefault() != null)
                throw new CustomMessageException("Já existe um usuário com a legenda informada");

            if (DbContext.Candidates.Where(x => x.Affiliation == obj.Affiliation).FirstOrDefault() != null)
                throw new CustomMessageException("Já existe um usuário do partido informado");

            obj.CandidateID = 0;
            obj.InsertData = DateTime.Now;
            DbContext.Candidates.Add(obj);
            SaveChanges();
        }

        public void Update(Candidate obj)
        {
            if (obj.Legend == 0 || string.IsNullOrWhiteSpace(obj.Name) || string.IsNullOrWhiteSpace(obj.Vice) || string.IsNullOrWhiteSpace(obj.Affiliation))
                throw new CustomMessageException("Os parâmetros informados são inválidos");

            DbContext.Candidates.Update(obj);
            SaveChanges();
        }

        public void Delete(Candidate obj)
        {
            DbContext.Candidates.Remove(obj);
            SaveChanges();
        }

        public IEnumerable<Candidate> Get() =>
            DbContext.Candidates.Where(x=>x.CandidateID != 1).ToList();

        public IEnumerable<Candidate> Get(Func<Candidate, bool> predicate) =>
            DbContext.Candidates.Where(x => x.CandidateID != 1).Where(predicate);

    }
}
