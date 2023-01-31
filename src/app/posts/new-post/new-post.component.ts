import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any =
    'https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg';
  selectedImg: any;
  categories: Array<object>;
  postForm: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder
  ) {
    this.postForm = fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      postImg: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  get formControl() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  isDisabled = true;

  @HostListener('scroll', ['$event'])
  onScroll(e: any) {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight - 1) {
      console.log('End');
      this.isDisabled = false;
    }
  }
}
