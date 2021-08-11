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

        [HttpGet("{id}")]
        public Article GetArticle(int id)
        {
            Article currentArticle = new Article();
            try
            {
                conn.Open();
                string sql = $"SELECT ArticleData FROM Article WHERE Id = {id}";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    currentArticle.Id = id;
                    currentArticle.ArticleData = rdr[0].ToString();
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

        [HttpPost("{id}")]
        public RedirectResult PostArticle(int id)
        {
            try
            {
                Article currentArticle = new Article();
                currentArticle.Id = id;
                currentArticle.ArticleData = Request.Form["article-data"];
                conn.Open();
                string sql = $"UPDATE Article SET ArticleData = '{currentArticle.ArticleData}' WHERE Id = {currentArticle.Id}";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();
            return Redirect("https://localhost:4200/");
        }

    }
}