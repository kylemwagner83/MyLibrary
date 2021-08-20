import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ArticleService } from '../article/article.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<any> {
  id:any;

  constructor(private article: ArticleService) { 
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.article.getArticlesWithoutContent().pipe(
      catchError(error => {
        return ('No data');
      })
    )
  }
}
