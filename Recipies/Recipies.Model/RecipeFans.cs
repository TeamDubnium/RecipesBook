using System.ComponentModel.DataAnnotations;

namespace Recipies.Model
{
    public class RecipeFans
    {
        [Key]
        public int RecipeFansId { get; set; }

        public int RecipeId { get; set; }

        public int UserId { get; set; }
    }
}