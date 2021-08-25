import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from 'src/app/shared/article';
import { ArticleService } from 'src/app/shared/article.service';
import { DatetimeService } from 'src/app/shared/datetime.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
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
    }
    this.articleService.createNewArticle(article);
  }

}