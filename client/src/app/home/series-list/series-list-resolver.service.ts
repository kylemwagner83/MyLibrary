import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SeriesService } from 'src/app/shared/series.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesListResolverService implements Resolve<any> {

  constructor(private series: SeriesService) { }

  resolve(): Observable<any> {
    return this.series.getSeriesList().pipe(
      catchError(error => {
        return ('No data');
      })
    )
  }

}
