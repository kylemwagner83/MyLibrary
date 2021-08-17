import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from './article.service';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverService implements Resolve<any> {

  constructor(private article: ArticleService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.article.getArticle().pipe(
      catchError(error => {
        return ('No data');
      })
    )
  }
}
