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
        public List<Series> GetArticlesWithoutContent()
        {
            List<Series> seriesList = new List<Series>();
            try
            {
                conn.Open();
                string sql = $"SELECT SeriesId, SeriesTitle, Modified FROM Series";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Series currentSeries = new Series();
                    currentSeries.SeriesId = Convert.ToInt32(rdr[0]);
                    currentSeries.SeriesTitle = rdr[1].ToString();
                    currentSeries.Modified = Convert.ToDateTime(rdr[2].ToString());
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