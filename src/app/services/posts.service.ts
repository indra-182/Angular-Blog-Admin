import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(selectedImg: any, postData: any, formStatus: any, id: any) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImg).then(() => {
      console.log('image upload successfully');
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((url) => {
          postData.postImgPath = url;
          if (formStatus == 'Edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
        });
    });
  }

  saveData(postData: any) {
    this.afs
      .collection('posts')
      .add(postData)
      .then(() => {
        this.toastr.success('Data Insert Successfully');
        this.router.navigate(['/posts']);
      });
  }

  loadData() {
    return this.afs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadOneData(id) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateData(id: any, postData: any) {
    this.afs
      .doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toastr.success('Data Insert Successfully');
        this.router.navigate(['/posts']);
      });
  }

  deleteImage(imgPath: any, id: any) {
    this.storage.storage
      .refFromURL(imgPath)
      .delete()
      .then(() => {
        this.deleteData(id);
      });
  }

  deleteData(id: any) {
    this.afs
      .doc(`posts/${id}`)
      .delete()
      .then(() => {
        this.toastr.success('Data Deleted...!');
      })
      .catch(() => {
        this.toastr.error('Data Failed to Delete');
      });
  }

  markFeatured(id : any, featuredData) {
    this.afs.doc(`posts/${id}`).update(featuredData).then(() => {
      this.toastr.info('Featured Status Updated');
    })
  }
}
