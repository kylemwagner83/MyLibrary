import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from '../shared/article';
import { ArticleService } from '../shared/article.service';
import { DatetimeService } from '../shared/datetime.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  articleList!: IArticle[];
  latestArticleId = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private dateTimeService: DatetimeService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.articleList = response.article;
      this.findLatestArticleId();
    });
  }

  findLatestArticleId() {
    this.articleList.forEach(element => {
      if(element.articleId > this.latestArticleId) {
        this.latestArticleId = element.articleId
      }
    });
  }

  createNewArticle() {

    const article: IArticle = {
      articleId: this.latestArticleId + 1,
      articleTitle: "New article",
      articleData: "",
      seriesId: 1,
      seriesPosition: 1,
      categoryId: 1,
      modified: this.dateTimeService.getCurrentDateTime()
      // modified: '2022-08-24T13:33:05'
    }
    this.articleService.createNewArticle(article)
  }

}