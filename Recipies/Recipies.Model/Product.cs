using System.ComponentModel.DataAnnotations;

namespace Recipies.Model
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 1, ErrorMessage =
             "Product Name must be between 1 and 30 characters long.")]
        public string Name { get; set; }

        [Required]
        public Measurement Mesaurement { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}