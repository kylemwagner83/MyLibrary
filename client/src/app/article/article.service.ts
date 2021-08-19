import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  url = "https://localhost:5001/api/article/";

  constructor(
    public http: HttpClient
    ) { }

  getArticle(id:any): Observable<any> {
    return this.http.get(this.url + id);
  }
}
