using System;

namespace API.Entities
{
    public class ArticlesInSeries
    {
        public int SeriesId { get; set; }
        public string SeriesTitle { get; set; }
        public int ArticleId { get; set; }
        public string ArticleTitle { get; set; }
        public int SeriesPosition { get; set; }
        public DateTime Modified { get; set; }
    }
}