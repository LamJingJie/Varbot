import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

export interface User {
   name: string,
   email: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  realtimeDB_list: AngularFireList<User>;
  constructor(private store: AngularFirestore, private db: AngularFireDatabase) {
    this.realtimeDB_list = this.db.list("user"); //User
   }

   //Email is the Primary Key
   create(user: User, email_uid: any){
     console.log('user service')
    //this.db.database.ref('user/' + email).set(user);
    this.realtimeDB_list.set(email_uid, user);
   }

  userExists(email: string){
    return new Promise((resolve, reject)=>{
      this.realtimeDB_list.query.orderByChild("email").equalTo(email).once("value", snapshot=>{
        if(snapshot.exists()){
          let userData = snapshot.val();
          console.log(userData);
          resolve(true);
        }else{
          console.log("user doesnt exists");
          resolve(false);
        }
        
      })
    })
   }
}
