import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleResolverService } from './article/article-resolver.service';
import { ArticleListResolverService } from './home/article-list/article-list-resolver.service';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: 'article-component/:id', component: ArticleComponent, resolve: {article: ArticleResolverService} },
  { path: 'home-component', component: HomeComponent, resolve: {article: ArticleListResolverService} },
  { path: '', component: HomeComponent, resolve: {article: ArticleListResolverService} },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
