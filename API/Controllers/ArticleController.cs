using System;
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
        public string GetArticle(int id)
        {
            string articleData = "Data not retrieved";
            try
            {
                conn.Open();
                string sql = $"SELECT ArticleData FROM Article WHERE Id = {id}";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    articleData = rdr[0].ToString();
                }
                rdr.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();
            return articleData;
        }

        [HttpPost("{id}")]
        public string SaveArticle(int id)
        {
            try
            {
                int randNum = new Random().Next(1, 100);
                conn.Open();
                string sql = $"UPDATE Article SET ArticleData = '{randNum}' WHERE Id = {id}";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();
            return "Updated article";
        }

    }
}