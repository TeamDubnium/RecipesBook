using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recipies.Model
{
    public class Recipe
    {
        [Key]
        public int RecipeId { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 6, ErrorMessage =
             "Title must be between 6 and 30 characters long.")]
        public string Title { get; set; }

        [Required]
        [MinLength(10)]
        public string Content { get; set; }

        [Required]
        public virtual User User { get; set; }

        public virtual ICollection<Product> Products { get; set; }

        public virtual ICollection<RecipeFans> Fans { get; set; }

        public Recipe()
        {
            this.Products = new HashSet<Product>();
            this.Fans = new HashSet<RecipeFans>();
        }
    }
}