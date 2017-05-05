using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace MrFixIt.Models
{
    //Add the table we are referencing and it's dependency
    public class Worker
    {
        [Key]
        public int WorkerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Avaliable { get; set; }

        //change to virtual ApplicationUser
        public string UserName { get; set; }
        //this comes from Identity.User
        public virtual ICollection<Job> Jobs { get; set; }

        public Worker()
        {
            Avaliable = true;
        }

    }
}