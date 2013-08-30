using System.ComponentModel.DataAnnotations;

namespace Recipies.Model
{
    public class Product
    {
       
        public int Id { get; set; }

        public string Name { get; set; }

        public Measurement Mesaurement { get; set; }

        public int Quantity { get; set; }
    }
}