import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ArticleService } from '../shared/article.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverService implements Resolve<any> {
  id:any;

  constructor(private article: ArticleService) { 
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    this.id = route.params['id']
    return this.article.getArticle(this.id).pipe(
      catchError(error => {
        return ('No data');
      })
    )
  }
}
