import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { SharedService } from "../shared.service";
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  public posts = [];
  postSubscription: Subscription;


  constructor(private sharedService: SharedService) { 
    console.log(' this is posts component');
  }


  ngOnInit(): void {
    this.postSubscription = this.sharedService.getPost().subscribe((response2) => {
      console.log(response2)
      // this.posts.push()
    });
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }


}
