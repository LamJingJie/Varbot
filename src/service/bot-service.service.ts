import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
//


export default class Bot {
  name?: string;
  last_saved?: number;
  lists_code?: Array<any>;
  lists_desc?: Array<any>;
}
@Injectable({
  providedIn: 'root'
})
export class BotServiceService {
  realtimeDB_list: AngularFireList<Bot>;
  constructor(private store: AngularFirestore, private db: AngularFireDatabase) {
    this.realtimeDB_list = db.list("JingJie"); //User
  }

   /*Tasks
    #1: Add login function (*tmr*)
    #2: Add the CRUD function to DB (done)
    #3: Add the save btn logo, replacing the text box
    #4: Add "Saved" function that shows all saved bots
    #5: Add popup box that ask the user to name the bot before saving
  */

  getAll(){
    return this.realtimeDB_list.snapshotChanges();
  }

  get(key: string){
    return this.db.database.ref("JingJie/" + key).get();
  }

  add(bot: Bot){
    console.log(bot);
    //this.testRef2.push({title: {0: '1', 1: '2'}});
    return this.realtimeDB_list.push(bot);
  }

  update(key: string, bot: Bot){
    return this.realtimeDB_list.update(key, bot);
  }

  delete(key: string){
    return this.realtimeDB_list.remove(key);
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
