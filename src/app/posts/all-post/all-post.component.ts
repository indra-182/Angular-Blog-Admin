import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit {
  postArray: Array<object>;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.loadData().subscribe((val) => {
      console.log(val);
      this.postArray = val;
    });
  }

  onDelete(id: any, imgPath: any) {
    this.postService.deleteImage(imgPath, id);
  }

  onFeatured(id, val) {
    const featuredData = {
      isFeatured : val,
    }
    this.postService.markFeatured(id, featuredData);
  }
}
