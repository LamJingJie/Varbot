import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as puppeteer from 'puppeteer';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { BotsService } from './shared/bots.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'varbot';
  data12: any;
  bot_codes: string[] = ["await page.goto('https://touch.facebook.com/?_rdr', {waitUntil:'networkidle0',});", "await page.waitForSelector('input[name=email]'); await page.$eval('input[name=email]', el => el.value = 'jingjie105@hotmail.com');", "await page.$eval('input[id=m_login_password]', el => el.value = 'Gendensuikoden12!');"];

  constructor(private store: AngularFirestore, private botsService: BotsService){
    
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

    /*this.store.collection('test').doc('docidtest').valueChanges().subscribe(res=>{
      
      this.data12 = res;
      console.log(this.data12.name);
    });*/

  }

  ngOnInit(){
   // const browser = puppeteer.launch();
  }

  /*botbtn(){
    this.botsService.runBots(this.bot_codes).then((result: any)=>{
      console.log(result);
    });
  }*/
}
