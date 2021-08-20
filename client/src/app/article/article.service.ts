import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  saveArticle(id:any, content:any) {
    this.http.post(this.url + id, content).subscribe();
  }

  createNewArticle(content:any) {
    this.http.post(this.url, content).subscribe(x => {
      window.location.reload();
    });
  }
}
