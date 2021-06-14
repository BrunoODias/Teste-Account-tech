using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Configuration;

namespace ElectionMVC.Controllers
{
    public class ElactionController : Controller
    {
        private readonly string ApiUrl;

        public ElactionController(){
            ApiUrl = ConfigurationManager.AppSettings["ApiUrl"];
        }

        public IActionResult Index()
        {
            return Redirect("/Eleicao/Votar");
        }

        [Route("/Eleicao/Votar")]
        public IActionResult Vote()
        {
            ViewBag.ApiUrl = ApiUrl;
            return View();
        }
        [Route("/Eleicao/GerenciarCandidatos")]
        public IActionResult ManageCandidates()
        {
            ViewBag.ApiUrl = ApiUrl;
            return View();
        }
        [Route("/Eleicao/Relatorio")]
        public IActionResult RatingReport()
        {
            ViewBag.ApiUrl = ApiUrl;
            return View();
        }
    }
}
