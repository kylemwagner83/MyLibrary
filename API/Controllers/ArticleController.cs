using System;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : ControllerBase
    {
        MySqlConnection conn;
        public ArticleController()
        {
            string connStr = "server=localhost;user=root;database=library;port=3306;password=Pa$$w0rd";
            conn = new MySqlConnection(connStr);
        }

        [HttpGet("{articleId}")]
        public Article GetArticle(int articleId)
        {
            Article currentArticle = new Article();
            try
            {
                conn.Open();
                string sql = $"SELECT ArticleTitle, ArticleData, SeriesId, SeriesPosition, CategoryId FROM Article WHERE ArticleId = {articleId}";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    currentArticle.ArticleId = articleId;
                    currentArticle.ArticleTitle = rdr[0].ToString();
                    currentArticle.ArticleData = rdr[1].ToString();
                    currentArticle.SeriesId = Convert.ToInt32(rdr[2]);
                    currentArticle.SeriesPosition = Convert.ToInt32(rdr[3]);
                    currentArticle.CategoryId = Convert.ToInt32(rdr[4]);
                }
                rdr.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();
            return currentArticle;
        }

        [HttpPost("{articleId}")]
        // public RedirectResult PostArticle(int articleId)
        public void PostArticle(int articleId)
        {
            try
            {
                Article currentArticle = new Article();
                currentArticle.ArticleId = articleId;
                currentArticle.ArticleData = Request.Form["article-data"];
                Console.WriteLine(Request.Form["article-data"]);
                // conn.Open();
                // string sql = $"UPDATE Article SET ArticleData = '{currentArticle.ArticleData}' WHERE ArticleId = {currentArticle.ArticleId}";
                // MySqlCommand cmd = new MySqlCommand(sql, conn);
                // cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();
            // return Redirect("https://localhost:4200/");
        }

    }
}