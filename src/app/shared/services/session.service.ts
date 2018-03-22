import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

@Injectable()
export class SessionService {

  constructor(public afAuth: AngularFireAuth) { }

  isLoggedIn():User{
    return this.afAuth.auth.currentUser
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

}
