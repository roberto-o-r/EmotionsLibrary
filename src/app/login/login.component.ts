import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '../models/user.model';
import swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type = 1; // 1 Login, 2 Register, 3 Forgot password.
  user: User = {email: "", password: ""};  


  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  facebookLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(function(user){
      // Login successful.
      window.location.reload();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message
      console.log(errorCode + " " + errorMessage);
      swal("Ooops!", "An error has ocurred while trying authenticate you with Facebook. Please try again.", "info");
    });
  }

  emailLogin() {
    firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(function(user){
      // Login successful.
      window.location.reload();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      swal("Ooops!", "You have entered an invalid email or password. Please try again.", "info");
    });
  }

}
