import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(data => {
      this.articles = data;
      this.articles = data.slice(0, 3); // Fetch only the first three articles
      // If you want only the first few articles:
      // this.articles = data.slice(0, 5); // Adjust the number as needed
    });
  }

}
