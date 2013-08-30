using System.Collections.Generic;

namespace Recipies.Model
{
    public class Recipe
    {
        public int RecipeId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public virtual User Creator { get; set; }

        public virtual ICollection<Product> Products { get; set; }

        public virtual ICollection<User> Fans { get; set; }

        public Recipe()
        {
            this.Products = new HashSet<Product>();
            this.Fans = new HashSet<User>();
        }
    }
}