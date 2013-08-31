namespace Recipies.Data.Migrations
{
    using Recipies.Model;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public sealed class Configuration : DbMigrationsConfiguration<Recipies.Data.RecipesContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(Recipies.Data.RecipesContext context)
        {
            //  This method will be called after migrating to the latest version.
            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            Category[] categories = new Category[] 
            {
                new Category { Name = "Main dish" },
                new Category { Name = "Desert" },
                new Category { Name = "Soup" },
                new Category { Name = "Appetizer" },
                new Category { Name = "Side dish" },
                new Category { Name = "Snack" },
                new Category { Name = "Salad"},
                new Category { Name = "Dinner"}
            };


            User[] users = new User[] 
            {
                new User { Username = "admina", Role= Role.Admin, AuthCode= "e58a64b61a78eea90b2f2ce1f624c6b94d32a9a9" },
                new User {  Username = "peshoo", Role= Role.Client, AuthCode= "1e7b9163ac7d121cd7fd56bcbe641bbbe7749a68" },
                new User {  Username = "mimeto", Role= Role.Client, AuthCode= "a02a7948aa2bcb63c0549794d075b4a584a7e5a7" } 
            };


            Product[] products = new Product[]
            {
                new Product { Name = "test product 1", Mesaurement = Measurement.ByTaste },
                
                new Product { Name = "test product 2", Mesaurement = Measurement.Kilogram, Quantity = 1 }
            };

            Recipe[] recipies = new Recipe[]
            {
                //new Recipe { Title = "TestUser", Category = categories[0], Creator = users[0], Content = "bake for 5 mins", Products = new Product[] { products[0], products[1] }, Fans = new User[] { users[1], users[2] } },
                new Recipe { Title = "Absolutely new Recipe", Category = categories[1], Creator = users[1], Content = "bake for 1 hour", Products = new Product[] { products[0] }, Fans = new User[] { users[0], users[2] } , PublishDate = DateTime.Now },
            };

            for (int i = 0; i < categories.Length; i++)
            {
                context.Categories.AddOrUpdate(
                   c => c.Name,
                    categories[i]
                );
            }

            for (int i = 0; i < users.Length; i++)
            {
                context.Users.AddOrUpdate(
                  u => u.Username,
                  users[i]
              );
            }

            for (int i = 0; i < products.Length; i++)
            {
                context.Products.AddOrUpdate(
                  u => u.Name,
                  products[i]
              );
            }

            for (int i = 0; i < recipies.Length; i++)
            {
                context.Recipes.AddOrUpdate(
                  u => u.Content,
                  recipies[i]
              );
            }
        }
    }
}
