import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BotServiceService {

  constructor(private store: AngularFirestore) {}

  getAllBot(){
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
  }
}
