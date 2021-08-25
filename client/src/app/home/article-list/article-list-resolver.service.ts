import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticleService } from 'src/app/shared/article.service';

@Injectable({
  providedIn: 'root'
})

export class ArticleListResolverService implements Resolve<any> {

  constructor(private article: ArticleService) { }

  resolve(): Observable<any> {
    return this.article.getArticlesWithoutContent().pipe(
      catchError(error => {
        return ('No data');
      })
    )
  }
}
