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
    var date = new Date();
    var amPm = "AM";
    
    function addZero(x:number) {
      let y = x.toString();
      if (x < 10) {
        y = "0" + y;
      }
      return y;
    }

    function checkAmPm(x:number) {
      if (x > 12) {
        x = x - 12;
        amPm = "PM";
      }
      return x;
    }

    var currentDateTime = 
      (date.getFullYear()) + "-" +
      (addZero(date.getMonth()+1)) + "-" + 
      addZero(date.getDate()) + " " +
      checkAmPm(date.getHours()) + ":" + 
      addZero(date.getMinutes()) + ":" + 
      addZero(date.getSeconds());

    const article: IArticle = {
      articleId: this.latestArticleId + 1,
      articleTitle: "New article",
      articleData: "",
      seriesId: 1,
      seriesPosition: 1,
      categoryId: 1,
      modified: currentDateTime
    }    
    this.articleService.createNewArticle(article)
  }

}