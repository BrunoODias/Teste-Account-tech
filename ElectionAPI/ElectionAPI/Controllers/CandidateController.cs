using ElectionAPI.Models;
using ElectionAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace ElectionAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private readonly IRepository<Candidate> Repository;

        public CandidateController(IRepository<Candidate> repository)
        {
            this.Repository = repository;
        }

        [HttpPost]
        public StatusCodeResult Candidate(Candidate candidate)
        {
            try
            {
                Repository.Add(candidate);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        public StatusCodeResult Candidate(int CandidateID)
        {
            try
            {
                var candidate = Repository.Get(x => x.CandidateID == CandidateID).FirstOrDefault();
                if (candidate == null)
                    return NotFound();

                Repository.Delete(candidate);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public IActionResult Candidates()
        {
            try
            {
                return new JsonResult(Repository.Get());
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
