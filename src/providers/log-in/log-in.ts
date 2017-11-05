import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';



/*
  Generated class for the LogInProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LogInProvider {
  public _isLogged = false;
  private _provider;
  constructor(public http: Http) {
    console.log('Hello LogInProvider Provider');
    this._provider = new firebase.auth.GoogleAuthProvider();

  }

  public setIsLogged(status : boolean) {
    this._isLogged = status;
  }

  public logInUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  public isLogged() {
    return (this._isLogged);
  }

  public signupUser(email: string, password: string, userName: string): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then( newUser => {
      firebase.database().ref('/users').child(newUser.uid).set({ email: email, userName: userName, pos: {lat: 0.0, long:0.0}, level: 0});
    });
  }
  public resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  public logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }

  public getCurrentUserId() {
    return (firebase.auth().currentUser.uid);
  }

  public getCurrentUserEmail() {
    return (firebase.auth().currentUser.email);
  }
}
