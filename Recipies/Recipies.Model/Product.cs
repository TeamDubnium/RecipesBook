namespace Recipies.Model
{
    public class Product
    {
        public int ProductId { get; set; }

        public string Name { get; set; }

        public Measurement Mesaurement { get; set; }

        public int Quantity { get; set; }
    }
}