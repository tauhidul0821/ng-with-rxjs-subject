import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsCountComponent } from './posts-count/posts-count.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {
    path: 'home',
    component: PostsComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'create-post',
    component: CreatePostComponent
  },
  {
    path: 'posts-count',
    component: PostsCountComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
