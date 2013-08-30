using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recipies.Model
{
    public class Recipe
    {
        public int Id { get; set; }

        [Required]
        [StringLength(40, MinimumLength = 6, ErrorMessage =
             "Title must be between 6 and 30 characters long.")]
        public string Title { get; set; }

        [Required]
        [MinLength(10)]
        public string Content { get; set; }

        public DateTime PublishDate { get; set; }

        [Required]
        public virtual Category Category { get; set; }

        //[InverseProperty("MyRecepies")]
        public virtual User Creator { get; set; }

        public virtual ICollection<Product> Products { get; set; }

        //[InverseProperty("Favorites")]
        public virtual ICollection<User> Fans { get; set; }



        public Recipe()
        {
            this.Products = new HashSet<Product>();
            this.Fans = new HashSet<User>();
        }
    }
}