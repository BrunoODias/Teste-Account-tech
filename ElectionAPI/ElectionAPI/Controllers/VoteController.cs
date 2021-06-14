using ElectionAPI.Models;
using ElectionAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ElectionAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly IRepository<Vote> Repository;

        public VoteController(IRepository<Vote> repositoy)
        {
            this.Repository = repositoy;
        }

        [HttpPost]
        public StatusCodeResult Vote(int CandidateID) {
            try
            {
                Repository.Add(new Vote() { CandidateID = CandidateID });
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult Votes()
        {
            try {
                VoteReport ret = new VoteReport();
                var model = Repository.Get().OrderBy(x=>x.Count).Reverse();
                if (model != null && model.Count() > 0)
                {
                    foreach (var current in model)
                        ret.VotesPerCandidate.Add(new VotePerCandidate()
                        {
                            CandidateName = current.Candidate.Name,
                            VotesCount = current.Count
                        });

                    ret.SetTotalCount(model.Select(x => x.Count).Aggregate((a, b) => a + b));
                }

                return new JsonResult(ret);
            }
            catch (Exception e) {
                return BadRequest();
            }
        }
    }
}