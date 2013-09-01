using Recipies.Data;
using Recipies.Model;
using Recipies.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Recipies.Controllers
{
    public class RecipesController : BaseApiController
    {
        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
               {
                   var context = new RecipesContext();

                   var recipeEntities = context.Recipes;
                   var model = recipeEntities
                       .Select(RecipeModel.FromRecipeToRecipeModel);

                   if (model == null)
                   {
                       throw new ArgumentException("No recipes");
                   }

                   var response = this.Request.CreateResponse(HttpStatusCode.OK, model);
                   return response;
               });

            return responseMsg;
        }

        [HttpGet]
        [ActionName("get")]
        public HttpResponseMessage GetById(int id)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
                 {
                     var context = new RecipesContext();

                     // CheckSession(context);

                     var recipeEntities = context.Recipes;
                     var model = recipeEntities.Where(x => x.Id == id)
                         .Select(RecipeDetails.FromRecipeToRecipeDetails)
                         .FirstOrDefault();

                     if (model == null)
                     {
                         throw new ArgumentException("No such recipe");
                     }

                     var response = this.Request.CreateResponse(HttpStatusCode.OK, model);
                     return response;
                 });

            return responseMsg;
        }

        [HttpPost]
        [ActionName("add")]
        public HttpResponseMessage Add(RecipeDetails recipe)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                var context = new RecipesContext();

                var user = GetCurrentUser(context);

                var category = context.Categories.FirstOrDefault(x => x.Title == recipe.CategoryName);

                if (category == null)
                {
                    throw new ArgumentException("No such category");
                }

                var addedRecipe = new Recipe()
                    {
                        Category = category,
                        Content = recipe.Content,
                        Creator = user,
                        PublishDate = DateTime.Now,
                        Title = recipe.Title
                    };

                context.Recipes.Add(addedRecipe);
                context.SaveChanges();

                var response = this.Request.CreateResponse(HttpStatusCode.Created, addedRecipe);
                return response;
            });

            return responseMsg;
        }

        [HttpPut]
        [ActionName("like")]
        public HttpResponseMessage Like(int id)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                var context = new RecipesContext();

                var user = GetCurrentUser(context);

                var recipe = context.Recipes.FirstOrDefault(x => x.Id == id);

                if (recipe == null)
                {
                    throw new ArgumentException("No such recipe.");
                }

                if (!user.Favorites.Contains(recipe))
                {
                    user.Favorites.Add(recipe);
                    context.SaveChanges();
                }
                var response = this.Request.CreateResponse(HttpStatusCode.OK);
                return response;
            });

            return responseMsg;
        }

        [HttpPut]
        [ActionName("delete")]
        public HttpResponseMessage Delete(int id)
        {
            var responseMsg = this.PerformOperationAndHandleExceptions(() =>
            {
                var context = new RecipesContext();

                var user = GetCurrentUser(context);

                var recipe = context.Recipes.FirstOrDefault(x => x.Id == id);

                if (recipe == null)
                {
                    throw new ArgumentException("No such recipe.");
                }

                if (recipe.Creator.UserId != user.UserId && user.Role != Role.Admin)
                {
                    throw new Exception("This user doesn't have the permissions to delete this recipe.");
                }

                context.Recipes.Remove(recipe);
                user.MyRecipes.Remove(recipe);

                context.SaveChanges();
                var response = this.Request.CreateResponse(HttpStatusCode.OK);
                return response;
            });

            return responseMsg;
        }
    }
}
