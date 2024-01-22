import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'article-list', component: ArticleListComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'create', component: ArticleCreateComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'edit-article/:id', component: ArticleEditComponent },
  { path: 'home', component: HomeComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
