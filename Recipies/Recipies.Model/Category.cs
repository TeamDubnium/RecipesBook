using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Recipies.Model
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        public string Name { get; set; }

        public ICollection<Recipe> Recipes { get; set; }

        public Category()
        {
            this.Recipes = new HashSet<Recipe>();
        }
    }
}