using System;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticleController : ControllerBase
    {
        [HttpGet]
        public string GetArticle()
        {
            string connStr = "server=localhost;user=root;database=library;port=3306;password=Pa$$w0rd";
            MySqlConnection conn = new MySqlConnection(connStr);
            string articleData = "Data not set";
            try
            {
                conn.Open();
                string Id = "1";
                string sql = $"SELECT ArticleData FROM Article where Id = {Id}";
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
            Console.WriteLine(articleData);
            return articleData;
        }

        [HttpPost]
        public void SaveArticle()
        {

        }

    }
}