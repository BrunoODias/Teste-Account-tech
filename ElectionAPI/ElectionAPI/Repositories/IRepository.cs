
using System;
using System.Collections.Generic;

namespace ElectionAPI.Repositories
{
    public interface IRepository<T>
    {
        public void Add(T obj);
        public void Update(T obj);
        public void Delete(T obj);
        public IEnumerable<T> Get();
        public IEnumerable<T> Get(Func<T, bool> predicate);
    }
}
