import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from './article';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})

export class ArticleComponent implements OnInit {
  article!: IArticle;
  formGroup:any;
  articleId:any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.articleId = this.activatedRoute.snapshot.paramMap.get("id");

    this.activatedRoute.data.subscribe((response: any) => {
      this.article = response.article;
    });
    
    this.formGroup = this.formBuilder.group({
      content: this.article.articleData
    });    
  }
  
  onSubmit (formData:any) {
    var name = formData;
    console.log(name);
  }

}
