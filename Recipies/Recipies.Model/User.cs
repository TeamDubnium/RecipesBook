using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace Recipies.Model
{
    public class User
    {
        [Key]
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

        public Role Role { get; set; }

        public virtual ICollection<Recipe> MyRecipes { get; set; }

        public virtual ICollection<RecipeFans> Favourites { get; set; }

        public User()
        {
            this.MyRecipes = new HashSet<Recipe>();
            this.Favourites = new HashSet<RecipeFans>();
            this.Role = Role.Client;
        }
    }
}
