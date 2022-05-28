import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
//


export default class Bot {
  name?: string;
  last_saved?: number;
  lists_code?: Array<any> =[];
  lists_desc?: Array<any> =[];
}
@Injectable({
  providedIn: 'root'
})
export class BotServiceService {
  constructor(private authService: AuthenticationService, private store: AngularFirestore, private db: AngularFireDatabase) {

  }

  getAll(){
    return this.db.list("user/" + this.authService.loginUserDetail.uid + "/bots", ref=> ref.orderByChild('last_saved')).snapshotChanges();
  }

  get(key: string){
    return this.db.database.ref("user/" + this.authService.loginUserDetail.uid + "/bots/" +  key).get();
  }

  add(bot: Bot){
    console.log(bot);
    //this.testRef2.push({title: {0: '1', 1: '2'}});
    return this.db.list("user/" + this.authService.loginUserDetail.uid + "/bots", ref=> ref.orderByChild('last_saved')).push(bot);
  }

  update(key: string, bot: Bot){
    return this.db.list("user/" + this.authService.loginUserDetail.uid + "/bots", ref=> ref.orderByChild('last_saved')).update(key, bot);
  }

  delete(key: string){
    return this.db.list("user/" + this.authService.loginUserDetail.uid + "/bots", ref=> ref.orderByChild('last_saved')).remove(key);
  }

  /*getAllBot(){
    this.store.collection('test').valueChanges().subscribe(val =>{
      let array: Array<any> = val;
      console.log(array);
    });
  }

  getOneBot(){
    this.store.collection('test').doc('docidtest').ref.get().then((doc=>{
      let data: any = doc.data();
      console.log(data);
      console.log(data.name);
    }));
  }

  delBot(){
    console.log("Bot deleted");
  }

  updateBot(){
    console.log("Bot updated");
  }

  addBot(){
    console.log("Bot added");
  }*/
}
