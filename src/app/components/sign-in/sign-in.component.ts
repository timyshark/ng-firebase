import { Component, OnInit } from '@angular/core';

import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  myToken: string;
  myUser: firebase.User;
  constructor(
    private dialog: MatDialog,
    private store: AngularFirestore,
    public auth: AngularFireAuth,  //firebase.auth()?
    public app: FirebaseApp) {

    //specific to Angular Library (not in the firebase docs)
    this.auth.user.subscribe(user => {
      this.myUser = user;
      localStorage.setItem("user",JSON.stringify(user));
      this.getToken();
    });
  }
  getToken() {
    this.auth.currentUser.then(u => {
      console.log("Got ", u);
      this.myUser = u;
      return u?.getIdToken(true);
    })
      .then((token) => {
        this.myToken = token;
        localStorage.setItem("token",token);
      });
  }
  login() {
    let x = this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        // let user = result.user;
        // let credentials = result.credential;
        // let extrainfo = result.additionalUserInfo;
        // console.log("Login user:" + JSON.stringify(user, null, 2))
        // console.log("Auth Domain:" + user.refreshToken);
        // console.log("Login credentials:" + JSON.stringify(credentials, null, 2))
        // console.log("Login addtional info:" + JSON.stringify(extrainfo, null, 2))
        // this.myUser = user;
        // this.myUser.getIdToken(true)
        //   .then(token => console.log("Direct to user token:", token));
        //this.getToken();
      });

  }

  resetPassword() {
    console.log("Password reset email has been sent!");

  }
  ngOnInit(): void {
  }
}
