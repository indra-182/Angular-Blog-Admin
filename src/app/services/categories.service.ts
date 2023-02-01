import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  saveData(data: any) {
    this.afs
      .collection('categories')
      .add(data)
      .then(() => {
        this.toastr.success('Data Insert Successfully...!');
      })
      .catch((err) => {
        this.toastr.error(err);
      });
  }

  loadData() {
    return this.afs
      .collection('categories')
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

  updateData(id: any, editData: any) {
    this.afs
      .doc(`categories/${id}`)
      .update(editData)
      .then(() => {
        this.toastr.success('Data Updated Successfully...!');
      })
      .catch((err) => {
        this.toastr.error(err);
      });
  }

  deleteData(id: any) {
    this.afs
      .doc(`categories/${id}`)
      .delete()
      .then(() => {
        this.toastr.success('Data Deleted Successfully...!');
      })
      .catch((err) => {
        this.toastr.error(err);
      });
  }
}
