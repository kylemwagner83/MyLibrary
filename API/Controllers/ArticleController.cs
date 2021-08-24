using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
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

        [HttpGet]
        public List<Article> GetArticlesWithoutContent()
        {
            List<Article> articleList = new List<Article>();
            try
            {
                conn.Open();
                // string sql = $"SELECT ArticleId, ArticleTitle, SeriesId, SeriesPosition, CategoryId, Modified FROM Article";
                string sql = $"SELECT ArticleId, ArticleTitle, SeriesId, SeriesPosition, CategoryId, (Modified) FROM Article";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Article currentArticle = new Article();
                    currentArticle.ArticleId = Convert.ToInt32(rdr[0]);
                    currentArticle.ArticleTitle = rdr[1].ToString();
                    currentArticle.SeriesId = Convert.ToInt32(rdr[2]);
                    currentArticle.SeriesPosition = Convert.ToInt32(rdr[3]);
                    currentArticle.CategoryId = Convert.ToInt32(rdr[4]);
                    currentArticle.Modified = Convert.ToDateTime(rdr[5].ToString());
                    // currentArticle.Modified = rdr[5].ToString();
                    
                    articleList.Add(currentArticle);
                }
                rdr.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();
            articleList = articleList.OrderByDescending(x => x.Modified).ToList();
            return articleList;
        }

        [HttpGet("{articleId}")]
        public Article GetArticle(int articleId)
        {
            Article currentArticle = new Article();
            try
            {
                conn.Open();
                string sql = $"SELECT ArticleTitle, ArticleData, SeriesId, SeriesPosition, CategoryId, Modified FROM Article WHERE ArticleId = {articleId}";
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
                    currentArticle.Modified = Convert.ToDateTime(rdr[5].ToString());
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
        public void UpdateArticle(Article article)
        {
            try
            {
                conn.Open();
                string sql = $"UPDATE Article SET ArticleData = '{article.ArticleData}', ArticleTitle = '{article.ArticleTitle}', Modified = '{article.Modified.ToString("yyyy-MM-dd HH:mm:ss")}' WHERE ArticleId = {article.ArticleId}";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();
        }

        [HttpPost]
        public IActionResult CreateNewArticle(Article article)
        {
            try
            {
                conn.Open();
                string sql = $"INSERT into Article (ArticleId, ArticleTitle, ArticleData, SeriesId, SeriesPosition, CategoryId, Modified) values ({article.ArticleId}, '{article.ArticleTitle}', '{article.ArticleData}', {article.SeriesId}, {article.SeriesPosition}, {article.CategoryId}, '{article.Modified.ToString("yyyy-MM-dd HH:mm:ss")}');";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();


            return Ok(article);
        }

        [HttpDelete("{articleId}")]
        public void DeleteArticle(int articleId) {
            try
            {
                conn.Open();
                string sql = $"DELETE from Article WHERE ArticleId = {articleId}";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();
        }



    }
}