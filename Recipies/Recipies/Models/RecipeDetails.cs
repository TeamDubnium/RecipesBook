﻿using Newtonsoft.Json;
using Recipies.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Recipies.Models
{
    public class RecipeDetails : RecipeModel
    {
        private IEnumerable<string> products;

        [JsonProperty("content")]
        public string Content { get; set; }

        public RecipeDetails()
        {
            this.products = new HashSet<string>();
        }

        [JsonProperty("products")]
        public IEnumerable<string> Products
        {
            get
            {
                return this.products;
            }
            set
            {
                this.products = value;
            }
        }

        [JsonIgnore]
        public static Expression<Func<Recipe, RecipeDetails >> FromRecipeToRecipeDetails
        {
            get
            {
                return x => new RecipeDetails()
                {
                    Id = x.Id,
                    Title = x.Title,
                    CategoryName = x.Category.Name,
                    Content = x.Content,
                   PublishDate = x.PublishDate,
                   CreatorUser = x.Creator.Username,
                   Rating = x.Fans.Count,
                   Products = x.Products.Select(p => p.Name)
                };
            }
        }
    }
}