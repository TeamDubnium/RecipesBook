using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recipies.Model
{
    public class Recipe
    {
        [Key]
        public int RecipeId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public virtual User Creator { get; set; }

        public virtual ICollection<Product> Products { get; set; }

        public virtual ICollection<RecipeFans> Fans { get; set; }

        public Recipe()
        {
            this.Products = new HashSet<Product>();
            this.Fans = new HashSet<RecipeFans>();
        }
    }
}