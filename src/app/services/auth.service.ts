import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoginGuard: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: any, password: any) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.success('Login Success');
        this.loadUser();
        this.router.navigate(['/']);
        this.isLogin.next(true);
        this.isLoginGuard = true;
      })
      .catch((e) => {
        this.toastr.warning('Login Failed');
      });
  }

  loadUser() {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.toastr.success('Logout Success');
      localStorage.removeItem('user');
      this.isLoginGuard = false;
      this.router.navigate(['/login']);
      this.isLogin.next(false);
    });
  }

  isLoggedIn() {
    return this.isLogin.asObservable();
  }
}
