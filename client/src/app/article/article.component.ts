import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from './article';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articleObject!: Article;
  formGroup;
  articleTitle = 'Stupid title'
  articleContent = 'test'

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.formGroup = this.formBuilder.group({
        content: this.articleContent
      });
   }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe((response: any) => {
      this.articleObject = response.article;
    });
  }
  
  onSubmit (formData:any) {
    var name = formData;
    console.log(name);
  }

}
