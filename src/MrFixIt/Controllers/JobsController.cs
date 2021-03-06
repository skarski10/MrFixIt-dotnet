﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MrFixIt.Models;
using Microsoft.EntityFrameworkCore;

namespace MrFixIt.Controllers
{
    public class JobsController : Controller
    {
        private MrFixItContext db = new MrFixItContext();

        //Takes you to the jobs index page
        public IActionResult Index()
        {
            return View(db.Jobs.Include(i => i.Worker).OrderByDescending(j => j.JobId).ToList());
        }

        //takes you to the jobs create page
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Job job)
        {
            db.Jobs.Add(job);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        //takes you to the jobs claim page
        public IActionResult Claim(int id)
        {
            var thisItem = db.Jobs.FirstOrDefault(items => items.JobId == id);
            return View(thisItem);
        }

        //Claim Post
        [HttpPost]
        public IActionResult Claim(int JobId, string Title)
        {
            Job job = db.Jobs.FirstOrDefault(j => j.JobId == JobId);
            job.Worker = db.Workers.FirstOrDefault(i => i.UserName == User.Identity.Name);
            db.Entry(job).State = EntityState.Modified;
            db.SaveChanges();
            return Json(job);
        }
        public IActionResult JobsList()
        {
            return View(db.Jobs.ToList());
        }
        [HttpPost]
        public IActionResult StartJob(int startJob)
        {
            Job getJob = db.Jobs.FirstOrDefault(thisJob => thisJob.JobId == startJob);
            getJob.Pending = true;
            db.Entry(getJob).State = EntityState.Modified;
            db.SaveChanges();
            return Json(getJob);
        }
        [HttpPost]
        public IActionResult CompleteJob(int completeJob)
        {
            Job getJob = db.Jobs.FirstOrDefault(thisJob => thisJob.JobId == completeJob);
            getJob.Completed = true;
            db.Entry(getJob).State = EntityState.Modified;
            db.SaveChanges();
            return Json(getJob);
        }
    }
}
