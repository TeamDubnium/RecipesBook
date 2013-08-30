using System.ComponentModel.DataAnnotations;

namespace Recipies.Model
{
    public class Product
    {
       
        public int Id { get; set; }

        [Required]
        [StringLength(40, MinimumLength = 1, ErrorMessage =
             "Name must be between 1 and 30 characters long.")]
        public string Name { get; set; }

        public Measurement Mesaurement { get; set; }

        public int Quantity { get; set; }
    }
}