using System;
using System.Collections.Generic;
using System.Linq;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeriesController : ControllerBase
    {
        MySqlConnection conn;
        public SeriesController()
        {
            string connStr = "server=localhost;user=root;database=library;port=3306;password=Pa$$w0rd";
            conn = new MySqlConnection(connStr);
        }

        [HttpGet]
        public List<ArticlesInSeries> GetSeriesList()
        {
            List<ArticlesInSeries> seriesList = new List<ArticlesInSeries>();
            try
            {
                conn.Open();
                // string sql = $"SELECT SeriesId, SeriesTitle, Modified FROM Series";
                string sql = $"SELECT Series.SeriesId, SeriesTitle, ArticleId, ArticleTitle, SeriesPosition, Series.Modified FROM Article INNER JOIN Series ON Article.SeriesID = Series.SeriesID";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    ArticlesInSeries currentSeries = new ArticlesInSeries();
                    currentSeries.SeriesId = Convert.ToInt32(rdr[0]);
                    currentSeries.SeriesTitle = rdr[1].ToString();
                    currentSeries.ArticleId = Convert.ToInt32(rdr[2]);
                    currentSeries.ArticleTitle = rdr[3].ToString();
                    currentSeries.SeriesPosition = Convert.ToInt32(rdr[4]);
                    currentSeries.Modified = Convert.ToDateTime(rdr[5].ToString());
                    seriesList.Add(currentSeries); // omit 'not in series'?
                }
                rdr.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();
            seriesList = seriesList.OrderByDescending(x => x.Modified).ToList();
            return seriesList;
        }




        

        [HttpGet("{seriesId}")]
        public void GetArticlesInSeriesById()
        {
            System.Console.WriteLine("At get series by ID controller");
        }




        [HttpPost]
        public IActionResult CreateNewSeries(Series series)
        {
            try
            {
                conn.Open();
                string sql = $"INSERT into Series (SeriesId, SeriesTitle, Modified) values ({series.SeriesId}, '{series.SeriesTitle}', '{series.Modified.ToString("yyyy-MM-dd HH:mm:ss")}');";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            conn.Close();

            return Ok(series);
        }




        [HttpPost("{seriesId}")]
        public void UpdateSeries(Series series)
        {
            System.Console.WriteLine("At HTTP POST Controller - update series");
            // try
            // {
            //     conn.Open();
            //     string sql = $"UPDATE Article SET ArticleData = '{article.ArticleData}', ArticleTitle = '{article.ArticleTitle}', Modified = '{article.Modified.ToString("yyyy-MM-dd HH:mm:ss")}' WHERE ArticleId = {article.ArticleId}";
            //     MySqlCommand cmd = new MySqlCommand(sql, conn);
            //     cmd.ExecuteNonQuery();
            // }
            // catch (Exception ex)
            // {
            //     Console.WriteLine(ex.ToString());
            // }
            // conn.Close();
        }







    }
}