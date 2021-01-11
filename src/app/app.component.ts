import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from './task/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { FirebaseApp } from '@angular/fire';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AuthApp';
  todo = getObservable(this.store.collection('todo'));
  inProgress = getObservable(this.store.collection('inProgress'));
  done = getObservable(this.store.collection('done'));
  myToken: string;
  myUser: firebase.User;
  constructor(
    private dialog: MatDialog,
    private store: AngularFirestore,
    public auth: AngularFireAuth,  //firebase.auth()?
    public app: FirebaseApp) {

    //specific to Angular Library (not in the firebase docs)
   this.auth.user.subscribe(user => {
     console.log("User changed:" + user);
     this.myUser = user;
     this.getToken();
   });
  }

  getToken(){
    this.auth.currentUser.then(u => {
      console.log("Got " ,u);
      this.myUser = u;
      return u?.getIdToken(true);
    })
      .then((token) => {
         console.log("Token:" , token);
         this.myToken = token;
       });
  }
  login() {

    let x = this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((result) => {
      let user = result.user;
      let credentials = result.credential;
      let extrainfo = result.additionalUserInfo;
      console.log("Login user:" + JSON.stringify(user,null,2))
      console.log("Auth Domain:" + user.refreshToken);
      console.log("Login credentials:" + JSON.stringify(credentials,null,2))
      console.log("Login addtional info:" + JSON.stringify(extrainfo,null,2))
      this.myUser = user;
      this.myUser.getIdToken(true)
      .then(token => console.log("Direct to user token:",token));
      //this.getToken();
    });

  }
  logout() {
    this.auth.signOut();
  }
  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
      } else {
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }


  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }


  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => this.store.collection('todo').add(result.task));
  }


}
