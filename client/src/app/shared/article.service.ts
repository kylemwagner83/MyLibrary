import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from './article';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  url = "https://localhost:5001/api/article/";

  constructor(private http: HttpClient) { }

  getArticle(id:any): Observable<any> {
    return this.http.get(this.url + id);
  }

  getArticlesWithoutContent(): Observable<any> {
    return this.http.get(this.url);
  }

  saveArticle(article:IArticle) {
    this.http.post(this.url + article.articleId, article).subscribe();
  }

  createNewArticle(content:IArticle) {
    this.http.post(this.url, content).subscribe(x => {
      window.location.reload();
    });
  }
}
