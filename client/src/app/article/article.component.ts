import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articleData = "Default";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.http.get("https://localhost:5001/api/article/1").subscribe((response: any) => {
        this.articleData = response["articleData"];
    }, error => {
      console.log(error);
    })
  }

}
