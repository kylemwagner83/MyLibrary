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
                Console.WriteLine("Connecting to MySQL");
                conn.Open();
                string sql = "SELECT * FROM Article";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Console.WriteLine(rdr[0] + " -- " + rdr[1]);
                    articleData = rdr[1].ToString();
                }
                rdr.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            conn.Close();
            Console.WriteLine("Done, closed MySQL connection");
            System.Console.WriteLine(articleData);
            return articleData;
        }

        [HttpPost]
        public void SaveArticle()
        {

        }

    }
}