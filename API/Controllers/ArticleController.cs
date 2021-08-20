using System;
using System.Collections.Generic;
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
                string sql = $"SELECT ArticleId, ArticleTitle, SeriesId, SeriesPosition, CategoryId FROM Article";
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
                    articleList.Add(currentArticle);
                }
                rdr.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();
            return articleList;
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
        public void PostArticle(int articleId, Article article) // This should probably return a status
        {
            try
            {
                Article currentArticle = new Article();
                currentArticle.ArticleId = article.ArticleId;
                currentArticle.ArticleTitle = article.ArticleTitle;
                currentArticle.ArticleData = article.ArticleData;
                currentArticle.SeriesId = article.SeriesId;
                currentArticle.SeriesPosition = article.SeriesPosition;
                currentArticle.CategoryId = article.CategoryId;

                conn.Open();
                string sql = $"UPDATE Article SET ArticleData = '{currentArticle.ArticleData}' WHERE ArticleId = {currentArticle.ArticleId}";
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