import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  get myUser() : firebase.User{
    return JSON.parse(localStorage.getItem("user"));
  }
  constructor(    public auth: AngularFireAuth,  //firebase.auth()?
  ) { }

  ngOnInit(): void {
    console.log("User :", this.myUser);
  }
  logout() {
    this.auth.signOut()
    .then(()=> {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    })
  }
}
