import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ISeries } from './series';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  url = "https://localhost:5001/api/series/";

  constructor(
    private http: HttpClient
  ) { }

  getSeriesList(): Observable<any> {
    return this.http.get(this.url);
  }
  
  createNewSeries(series:ISeries) {
    this.http.post(this.url, series).subscribe(x => {
      window.location.reload();
    });
  }

  createNewSeriesInEdit(series:ISeries) {
    this.http.post(this.url, series).subscribe(x => {
    });
  }

  updateSeries(series:ISeries) {
    this.http.post(this.url + series.seriesId, series).subscribe();
  }



}
