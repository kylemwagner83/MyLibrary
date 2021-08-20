import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from '../article/article';
import { ArticleService } from '../article/article.service';

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
    private articleService: ArticleService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.articleList = response.article;
      this.findLatestArticleId();
    });
  }

  findLatestArticleId() {
    this.latestArticleId = this.articleList[this.articleList.length - 1].articleId;
  }

  createNewArticle() {
    const article: IArticle = {
      articleId: this.latestArticleId + 1,
      articleTitle: "New article",
      articleData: "",
      seriesId: 1,
      seriesPosition: 1,
      categoryId: 1
    }
    this.articleService.createNewArticle(article)
    
  }

}