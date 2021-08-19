import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from './article.service';
import { catchError } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleResolverService implements Resolve<any> {
  id:any;

  constructor(
    private article: ArticleService, 
    private activatedRoute: ActivatedRoute,
    ) { 
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
