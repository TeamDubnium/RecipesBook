﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Recipies.Model
{
    public class User
    {

        public int UserId { get; set; }

        
        [StringLength(30, MinimumLength = 6, ErrorMessage =
            "UserName must be between 6 and 30 characters long.")]
        [RegularExpression(@"^[a-zA-Z''-'''.''''_''\s]{1,40}$", ErrorMessage =
            "Numbers and special characters are not allowed in the name.")]
        [Required(ErrorMessage = "UserName is required.")]
        public string Username { get; set; }

        
        [StringLength(40)]
        [Required(ErrorMessage = "AuthCode is required.")]
        public string AuthCode { get; set; }

        [StringLength(50)]
        public string SessionKey { get; set; }

        [Required]
        public Role Role { get; set; }

        //[InverseProperty("Creator")]
        public virtual ICollection<Recipe> MyRecipes { get; set; }

        //[InverseProperty("Fans")]
        public virtual ICollection<Recipe> Favourites { get; set; }

        public User()
        {
            this.MyRecipes = new HashSet<Recipe>();
            this.Favourites = new HashSet<Recipe>();
        }
    }
}
