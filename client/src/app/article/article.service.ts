import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url = "https://localhost:5001/api/article/1";

  constructor(public http: HttpClient) { }

  getArticle(): Observable<any> {
    return this.http.get(this.url);
  }
}
