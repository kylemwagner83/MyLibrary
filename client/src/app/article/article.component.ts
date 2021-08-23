import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from './article';
import { FormBuilder } from '@angular/forms';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})

export class ArticleComponent implements OnInit {
  article!: IArticle;
  editorForm:any;
  titleForm:any;
  h = window.innerHeight; 

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
  
    this.editorForm = this.formBuilder.group({
      content: this.article.articleData
    });
    
    this.titleForm = this.formBuilder.group({
      title: this.article.articleTitle
    });
  }
  
  saveArticle () {
    this.article.articleTitle = this.titleForm.value.title;
    this.article.articleData = this.editorForm.value.content;
    this.articleService.saveArticle(this.article);
  }

}