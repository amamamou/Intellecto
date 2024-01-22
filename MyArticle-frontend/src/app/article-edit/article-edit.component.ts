import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface Article {
  id: string;
  title: string;
  content: string;
  // Add other properties of article as needed
}

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  editForm!: FormGroup; // Definite assignment assertion
  articleID!: string;
  article: Article | undefined;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });

    this.route.params.subscribe(params => {
      this.articleID = params['id'];
      this.articleService.getArticleById(this.articleID).subscribe(article => {
        this.editForm.patchValue({
          title: article.title,
          content: article.content
        });
      });
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.articleService.updateArticle(this.articleID, this.editForm.value).subscribe({
        next: () => {
          this.router.navigate(['/article', this.articleID]);
        },
        error: (error) => {
          console.error('Error updating article:', error);
        }
      });
    }
  }

}
