import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { SharedService } from "../shared.service";
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  public postForm: FormGroup;


  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      name: new FormControl(''),
      post: new FormControl('')
    })
  }

  submit() {
    const post = {
      name: this.postForm.get('name')?.value,
      post: this.postForm.get('post')?.value
    }
    this.sharedService.setPost(post);
  }
}
