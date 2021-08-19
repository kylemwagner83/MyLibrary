import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from './article';
import { FormBuilder } from '@angular/forms';
import { ArticleService } from './article.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})

export class ArticleComponent implements OnInit {
  article!: IArticle;
  formGroup:any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private articleService: ArticleService
    ) {
   }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.article = response.article;
    });
  
    this.formGroup = this.formBuilder.group({
      content: this.article.articleData
    });    
  }
  
  onSubmit (formData:any) {
    this.article.articleData = formData["content"];
    this.articleService.saveArticleContent(this.article.articleId, this.article);
  }


}