import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public posts = new Subject();

  constructor() { }

  setPost(post:any){
    this.posts.next(post);
  }

  getPost(){
    return this.posts;
  }
}
