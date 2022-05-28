import * as auth from 'firebase/auth';
import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { from, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User, UserService } from '../service/user.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData: any;

  constructor(private userService: UserService, public afAuth: AngularFireAuth,public ngZone: NgZone) {
    //It to be triggered during sign-in/signout
    this.afAuth.authState.subscribe((user=>{
     // console.log(user);
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
      this.updateProfile(userData);
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
        if(!this.userService.userExists(userData.email)){
          console.log("User doesn't exists");
          this.userService.create(userData, result.user?.uid);
          return;
        }
        console.log("Welcome back!");
        
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  //Update auth profile data
  async updateProfile(user: User){

    const profile = {
      displayName: user.name
    }
    return (await this.afAuth.currentUser)?.updateProfile(profile).then((res=>{

      //update localstorage
      let localStorageData =  JSON.parse(localStorage.getItem('user')!);
      localStorageData.displayName = profile.displayName;
      localStorage.setItem('user',JSON.stringify(localStorageData));

      console.log("Updated profile")
    })).catch((err=>{
      console.log("Auth: "  +err);
    }));
    
    
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
