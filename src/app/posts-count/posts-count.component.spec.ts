import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCountComponent } from './posts-count.component';

describe('PostsCountComponent', () => {
  let component: PostsCountComponent;
  let fixture: ComponentFixture<PostsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
