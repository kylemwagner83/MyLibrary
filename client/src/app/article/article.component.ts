import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from '../shared/article';
import { FormBuilder } from '@angular/forms';
import { ArticleService } from '../shared/article.service';
import { DatetimeService } from '../shared/datetime.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


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
  modalRef!: BsModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private dateTimeService: DatetimeService,
    private modalService: BsModalService
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
    this.article.modified = this.dateTimeService.getCurrentDateTime();
    this.articleService.saveArticle(this.article);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.articleService.deleteArticle(this.article);
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }



}