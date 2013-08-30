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
                new Category { Name = "Salad"}
            };


            User[] users = new User[] 
            {
                new User {Username = "Admin", Role= Role.Admin, AuthCode= "1f95ec61b6ef02b5d2b138654da138bfdbbc7f3c" }
            };


            Recipe[] recipies = new Recipe[]
            {
                new Recipe {Title = "TestUser"},


            };
            

            //context.Categories.AddOrUpdate(
            //    c => c.Name,
            //    new Category { Name = "Main dish" },
            //    new Category { Name = "Desert" },
            //    new Category { Name = "Soup" },
            //    new Category { Name = "Appetizer" },
            //    new Category { Name = "Side dish" },
            //    new Category { Name = "Snack" },
            //    new Category { Name = "Salad"}
            // );
        }
    }
}
