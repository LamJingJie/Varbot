import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { User, UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;

  constructor(private userService: UserService, public afAuth: AngularFireAuth,public ngZone: NgZone) {

    //It to be run whenever there is a change in the user
    this.afAuth.authState.subscribe((user=>{
      //console.log(user);
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        console.log("Logged in");
      }else{
        localStorage.setItem('user', 'null');
        console.log("Logged out");
      }
    }))
   
  }

  async login(email: string, password: string){
    return await this.afAuth.signInWithEmailAndPassword(email, password).catch((err=>{
      window.alert(err.message);
    }))
  }


  async SignUp(email: string, userData: User, password: string){
    //console.log(userData);
    console.log(this.afAuth.currentUser);
    return await this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((result)=>{
      console.log(result.user?.uid);
      console.log("Signed up");
      
      this.userService.create(userData, result.user?.uid);
    }).catch(err=>{
      console.log(err);
      window.alert(err.message);
    })
  }

  GoogleAuth(){
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        console.log("Signed up successfully");
      }
    });
  }

  // Auth logic to run auth providers (e.g. Google, Facebook, etc)
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        let userData: User ={
          name: result.user?.displayName!,
          email: result.user?.email!
        }
        //console.log(userData);
        this.userService.create(userData, result.user?.uid);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  async resetPassword(email: string){
   // this.afAuth.get
   console.log(email);
    return await this.afAuth.sendPasswordResetEmail(email).then((res=>{
      console.log("Email sent. Please check your inbox");
    }));
  }

  async Signout(){
    return await this.afAuth.signOut();
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  get loginUserDetail(): any {
    return JSON.parse(localStorage.getItem('user')!);
  }

  

}
