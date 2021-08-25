import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatetimeService } from 'src/app/shared/datetime.service';
import { ISeries } from 'src/app/shared/series';
import { SeriesService } from 'src/app/shared/series.service';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {
  seriesList!: ISeries[];
  latestSeriesId = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seriesService: SeriesService,
    private dateTimeService: DatetimeService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.seriesList = response.series;
      this.findLatestSeriesId();
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

}
