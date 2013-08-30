﻿using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Recipies.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Recipies.Models
{
    public class ProductModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("mesaurement")]
        [JsonConverter(typeof(StringEnumConverter))]
        public Measurement Mesaurement { get; set; }


        [JsonProperty("quantity")]
        public int Quantity { get; set; }

        [JsonIgnore]
        public static Expression<Func<Product, ProductModel>> FromProductToProductModel
        {
            get
            {
                return x => new ProductModel()
                {
                    Name = x.Name,
                    Mesaurement =  x.Mesaurement,
                    Quantity = x.Quantity
                };
            }
        }
    }
}