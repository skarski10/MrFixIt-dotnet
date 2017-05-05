using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MrFixIt.Models;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MrFixIt.Controllers
{
    public class WorkersController : Controller
    {
        private MrFixItContext db = new MrFixItContext();
        // GET: /<controller>/
        public IActionResult Index()
        {
            var thisWorker = db.Workers.Include(i =>i.Jobs).FirstOrDefault(i => i.UserName == User.Identity.Name);
            if (thisWorker != null)
            {
                return View(thisWorker);
            }
            else
            {
                return RedirectToAction("Create");
            }
        }

        public IActionResult Create()
        {
            return View();
        }


        [HttpPost]
        public IActionResult Create(Worker worker)
        {
            worker.UserName = User.Identity.Name;
            db.Workers.Add(worker); 
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        [HttpPost]
        public IActionResult StartJob(int JobId)
        {
            Job getJob = db.Jobs.FirstOrDefault(thisJob => thisJob.JobId == JobId);
            getJob.Worker = db.Workers.FirstOrDefault(i => i.UserName == User.Identity.Name);
            getJob.Pending = true;
            db.Entry(getJob).State = EntityState.Modified;
            db.SaveChanges();
            return Json(getJob);
        }
        [HttpPost]
        public IActionResult CompleteJob(int jobId)
        {
            Job getJob = db.Jobs.FirstOrDefault(thisJob => thisJob.JobId == jobId);
            getJob.Completed = true;
            db.Entry(getJob).State = EntityState.Modified;
            db.SaveChanges();
            return Json(getJob);
        }
    }
}
