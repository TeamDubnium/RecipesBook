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

        // GET api/Recipies
        public IQueryable<RecipeModel> GetPosts()
        {
            var context = new RecipesContext();

           // CheckSession(context);

            var recipeEntities = context.Recipes;
            var model = recipeEntities
                .Select(RecipeModel.FromRecipeToRecipeModel);
           
            return model;
        }


        // GET api/Recipies/id
        public RecipeDetails GetPost( int id)
        {
            var context = new RecipesContext();

            // CheckSession(context);

            var recipeEntities = context.Recipes;
            var model = recipeEntities.Where(x=> x.Id == id)
                .Select(RecipeDetails.FromRecipeToRecipeDetails)
                .FirstOrDefault();                 

            return model;
        }

        ////api/threads?sessionKey=.......&page=5&count=3
        //public IQueryable<PostDetails> GetPosts(int page, int count,
        //   string sessionKey)
        //{
        //    var models = this.GetPosts()
        //        .Skip(page * count)
        //        .Take(count);
        //    return models;
        //}




        ////api/posts?keyword=web-services
        //public IQueryable<PostDetails> GetPosts(string keyword)
        //{
        //    var keywordToLower = keyword.ToLower();

        //    var postEntities = this.GetPosts();
        //    var models =
        //       (from post in postEntities
        //        where (post.Tags.Where(t => t.Title == keywordToLower).Count() > 0)
        //        select post);

        //    return models;
        //}

        ////GET api/posts?tags=web,webapi
        //public IQueryable<PostDetails> GetPostsTags(string tags)
        //{
        //    IEnumerable<string> keywords = tags.Split(new char[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries);
        //    IQueryable<PostDetails> models = this.GetPosts();
        //    foreach (var keyword in keywords)
        //    {
        //        var keywordToLower = keyword.ToLower();

        //        models = (from post in models
        //                  where (post.Tags.Where(t => t.Title == keywordToLower).Count() > 0)
        //                  select post);

        //    }

        //    return models;
        //}






        //{ "title": "NEW POST",
        //  "tags": ["post"],
        //  "text": "this is just a test post" }

        //// POST api/Posts
        //public HttpResponseMessage PostPost(NewPostModel post)
        //{
        //    var responseMsg = this.PerformOperationAndHandleExceptions(
        //        () =>
        //        {
        //            var context = new BloggingSystemContext();
        //            using (context)
        //            {
        //                var user = CheckSession(context);

        //                var newPost = new Post()
        //                {
        //                    Title = post.Title,
        //                    PostDate = DateTime.Now,
        //                    Text = post.Text,
        //                    User = user,

        //                };

        //                context.Posts.Add(newPost);
        //                context.SaveChanges();

        //                var tagTitlesFromTheTitle = post.Title.Split(new char[] { ' ', '.', '!', '?', ',', ';', ':' }, StringSplitOptions.RemoveEmptyEntries).ToList();

        //                tagTitlesFromTheTitle.AddRange(post.Tags);

        //                var loadedTags = new List<Tag>();

        //                //var tran = new TransactionScope(
        //                //TransactionScopeOption.RequiresNew, new TransactionOptions() 
        //                // { IsolationLevel = IsolationLevel.ReadUncommitted});
        //                //using (tran)
        //                // {
        //                foreach (var tagTitle in tagTitlesFromTheTitle)
        //                {
        //                    var tagTitleToLower = tagTitle.ToLower();

        //                    var currentTag = context.Tags.FirstOrDefault(t => t.Title == tagTitleToLower);


        //                    if (currentTag == null)
        //                    {
        //                        context.Tags.Add(new Tag() { Title = tagTitleToLower });
        //                        context.SaveChanges();
        //                        currentTag = context.Tags.FirstOrDefault(t => t.Title == tagTitleToLower);
        //                    }

        //                    // Debug.Assert(currentTag != null);

        //                    currentTag.Posts.Add(newPost);

        //                    // loadedTags.Add(currentTag);
        //                    context.SaveChanges();
        //                }

        //                // tran.Complete();
        //                //}

        //                // newPost.Tags = loadedTags;


        //                var response =
        //                    this.Request.CreateResponse(HttpStatusCode.Created,
        //                        post);
        //                return response;
        //            }
        //        });

        //    return responseMsg;
        //}


        ////Put api/posts/{postId}/comment
        //[ActionName("comment")]
        //public HttpResponseMessage PutComment(int postId, [FromBody]CommentModel comment)
        //{
        //    var responseMsg = this.PerformOperationAndHandleExceptions(
        //        () =>
        //        {
        //            var context = new BloggingSystemContext();
        //            using (context)
        //            {
        //                var user = CheckSession(context);


        //                var post = (from p in context.Posts
        //                            where (p.Id == postId)
        //                            select p).FirstOrDefault();

        //                if (post == null)
        //                {
        //                    throw new InvalidOperationException("No post found.");
        //                }

        //                var newComment = new Comment()
        //                {
        //                    Text = comment.Text,
        //                    User = user,
        //                    PostDate = DateTime.Now,
        //                    Post = post
        //                };


        //                context.Comments.Add(newComment);

        //                context.SaveChanges();

        //                post.Comments.Add(newComment);

        //                context.SaveChanges();
        //                var response =
        //                    this.Request.CreateResponse(HttpStatusCode.OK);
        //                return response;
        //            }
        //        });

        //    return responseMsg;
        //}

        //[22:10:04] Nader:  public static Expression<Func<Post, PostModel>> FromPost
        //{
        //    get
        //    {
        //        return x => new PostModel()
        //        {
        //            Id = x.Id,
        //            Title = x.Title,
        //            PostedBy = x.User.DisplayName,
        //            PostDate = x.PostDate,
        //            Text = x.Text,
        //            Tags = x.Tags.Select(t => t.Name),
        //            Comments = x.Comments.AsQueryable().Select(CommentModel.FromModel)
        //        };
        //    }
        //}
    }
}
