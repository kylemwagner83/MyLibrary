import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IArticle } from 'src/app/shared/article';
import { ArticleService } from 'src/app/shared/article.service';
import { IArticlesInSeries } from 'src/app/shared/articlesInSeries';
import { DatetimeService } from 'src/app/shared/datetime.service';
import { ISeries } from 'src/app/shared/series';
import { SeriesService } from 'src/app/shared/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {
  articlesInSeriesList! : IArticlesInSeries[];
  seriesList: ISeries[] = [];
  latestSeriesId = 0;
  modalRef?: BsModalRef;
  newArticleTitle: any;
  currentSeriesId = 0;
  article!: IArticle;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seriesService: SeriesService,
    private dateTimeService: DatetimeService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.articlesInSeriesList = response.series;
      this.generateSeriesList();
      this.findLatestSeriesId();
    });

    this.newArticleTitle = this.formBuilder.group({
      newArticleTitle: "New Article"
    });

  }

  generateSeriesList() {
    this.articlesInSeriesList.forEach(element => {
      var alreadyExists = false;
      const series: ISeries = {
        seriesId: element.seriesId,
        seriesTitle: element.seriesTitle,
        modified: element.modified
      };

      this.seriesList.forEach(element => {
        if (element.seriesId == series.seriesId)
        alreadyExists = true;
      });

      if (alreadyExists == false) {
        this.seriesList.push(series);
      }
    });
  }

  findLatestSeriesId() {
    this.seriesList.forEach(element => {
      if(element.seriesId > this.latestSeriesId) {
        this.latestSeriesId = element.seriesId
      }
    });
  }

  createNewSeries() {
    const series: ISeries = {
      seriesId: this.latestSeriesId + 1,
      seriesTitle: "New Series",
      modified: this.dateTimeService.getCurrentDateTime()
    }
    this.seriesService.createNewSeries(series);
  }

  openAppendArticleModal(template: TemplateRef<any>, seriesId: number) {
    this.currentSeriesId = seriesId;
    this.modalRef = this.modalService.show(template);
  }


  findLatestArticleId(): number {
    let latestArticleId = 0;
    this.articlesInSeriesList.forEach(element => {
      if(element.articleId > latestArticleId) {
        latestArticleId = element.articleId;
      }
    });
    return latestArticleId;
  }

  findLatestSeriesPosition(): number {
    let latestSeriesPosition = 0;
    this.articlesInSeriesList.forEach(element => {
      if(element.seriesId != 1 
        && element.seriesId == this.currentSeriesId 
        && element.seriesPosition > latestSeriesPosition) 
        {
          latestSeriesPosition = element.seriesPosition;
        }
    });
    return latestSeriesPosition;
  }

  appendNewArticle() {
    this.article = {
      articleId: this.findLatestArticleId() + 1,
      articleTitle: this.newArticleTitle.value.newArticleTitle,
      articleData: "",
      seriesId: this.currentSeriesId,
      seriesPosition: this.findLatestSeriesPosition() + 1,
      categoryId: 1,
      modified: this.dateTimeService.getCurrentDateTime()
    }
    this.articleService.appendNewArticle(this.article);
    this.modalService.hide();
  }


}
