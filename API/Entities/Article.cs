namespace API.Entities
{
    public class Article
    {
        public int ArticleId { get; set; }
        public string ArticleTitle { get; set; }
        public string ArticleData { get; set; }
        public int SeriesId { get; set; }
        public int SeriesPosition { get; set; }
        public int CategoryId { get; set; }
    }
}