import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as puppeteer from 'puppeteer';
import { Builder, By, Key, until } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'varbot';
  data12: any;
  constructor(private store: AngularFirestore){
    
    //puppeteer.use(require('puppeteer-extra-plugin-angular'));
    
    /*this.store.collection('test').valueChanges().subscribe(val =>{
      
      let array: Array<any> = val;
      console.log(array);
    });

    this.store.collection('test').doc('docidtest').ref.get().then((doc=>{
      let data: any = doc.data();
      console.log(data);
      console.log(data.name);
    }));*/

    this.store.collection('test').doc('docidtest').valueChanges().subscribe(res=>{
      
      this.data12 = res;
      console.log(this.data12.name);
    });

  }

  ngOnInit(){
   // const browser = puppeteer.launch();
  }

  async testbtn(){
    //let browser = await this.puppeteer.launch();
    //let driver = await new Builder().forBrowser("chrome").build();
    console.log("Test");
    eval("console.log('hi its me!'); console.log('no its not me!');");
  }
}
