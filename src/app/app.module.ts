import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostsComponent } from './posts/posts.component';
import { PostsCountComponent } from './posts-count/posts-count.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    PostsComponent,
    PostsCountComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
