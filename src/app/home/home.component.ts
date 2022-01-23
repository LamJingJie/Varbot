import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { BotsService } from '../shared/bots.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url_section_form = new FormGroup({
    enter_website: new FormControl(''),
  });

  automation_section_form = new FormGroup({
    
    enter_input: new FormControl(''),
    enter_path: new FormControl(''),
    enter_text: new FormControl(''),

  });
  modalOptions:NgbModalOptions;

  url_section:boolean = false;

  selected_option= '';

  bot_codes: string[] = [];
  bot_code_name: string[] = [];//for the display on the left of the 2nd section
  //bot_codes: string[] = ["await page.goto('https://touch.facebook.com/?_rdr', {waitUntil:'networkidle0',});", "await page.waitForSelector('input[name=email]'); await page.$eval('input[name=email]', el => el.value = 'jingjie105@hotmail.com');", "await page.$eval('input[id=m_login_password]', el => el.value = 'Gendensuikoden12!');"];

  constructor(private snackBar: MatSnackBar, private modalService: NgbModal, private cdRef:ChangeDetectorRef, private botService: BotsService) {  this.modalOptions = {
    backdropClass:'customBackdrop'
  }}

  ngOnInit(){
    document.getElementById('selection_click')?.focus();
    this.selection_btn('CLICK');
  }

  //Change btn background permanently when clicked.
  async selection_btn(selectionType: string){
    //console.log(selectionType);
    this.automation_section_form.reset();
   
    let element_click = document.getElementById("selection_click");
    let element_txt = document.getElementById("selection_input");
    let element_screenshot = document.getElementById("selection_screenshot");
    let element_end = document.getElementById("selection_end");
       
    if(element_click?.classList.contains("selection_background")){
      element_click?.classList.remove("selection_background");
      //console.log("Removed");
    }
    if(element_end?.classList.contains("selection_background")){
      element_end?.classList.remove("selection_background");
    }
    if(element_txt?.classList.contains("selection_background")){
      element_txt?.classList.remove("selection_background");
    }
    if(element_screenshot?.classList.contains("selection_background")){
      element_screenshot?.classList.remove("selection_background");
    }   
    if(selectionType === "CLICK"){
      element_click?.classList.add("selection_background");
      this.selected_option = "CLICK";
      //console.log("Added");     
      return
    }   
    if(selectionType === "TXT"){
      element_txt?.classList.add("selection_background");   
      this.selected_option = "TXT";   
      return
    }  
    if(selectionType === "SS"){
      element_screenshot?.classList.add("selection_background"); 
      this.selected_option = "SS";
      return
    }  
    if(selectionType === "END"){
      element_end?.classList.add("selection_background");    
      this.selected_option = "END";
      return
    }
  }

  //Section 1
  add_code_website(val: any){
    //console.log(val['enter_website']);
    
    if(val['enter_website'] === null || val['enter_website'] === ""){
      this.popup_msg("Empty input field");
      return
    }
    let url: any;
    try {
      url = new URL(val['enter_website']);
    } catch (error) {
      this.popup_msg("Invalid website url.")
      return
    }
   //"await page.goto('https://touch.facebook.com/?_rdr', {waitUntil:'networkidle0',});"
    //console.log(url.hostname);
    let code = "await page.goto(" + '"' + url.href + '"' + ", {waitUntil: 'networkidle0',});";
    //console.log(code);
    console.log(url);
    //console.log(code);
    this.bot_codes[0] = code;
    this.bot_code_name[0] = 'Open to ' +'"'+ url.href + '"';
    console.log(this.bot_code_name);
    //console.log(this.bot_codes);
    /*this.botService.runBots(this.bot_codes).then((result: any)=>{
      console.log(result);
    });*/
     
  }

  //Section 2
  add_code(val: any){
    console.log(val);
    //console.log(this.selected_option);
    if(this.bot_codes.length <= 0){
      this.popup_msg("Please provide the WEBSITE URL to continue.");
      return
    }

    if(this.bot_code_name.includes('Bot ends here')){
      this.popup_msg("No adding of instructions after you have ended your bot.");
      return
    }

    if(this.selected_option==="CLICK"){
      //bot code
      if(val['enter_input']==='' || val['enter_input']=== null){
        this.popup_msg("Empty input field at 'CLICK' section");
        return
      }
      let waitForSelector = "await page.waitForSelector(" + '"' + val['enter_input'] + '"' + ");";
      let click = "await page.click(" + '"' + val['enter_input'] + '"' + ");"
      
      //console.log(waitForSelector);
      //console.log(click);
      this.bot_codes.push(waitForSelector + click);
      this.bot_code_name.push('Click on ' + '"'+ val['enter_input'] + '"');
      console.log(this.bot_codes);
      console.log(this.bot_code_name);
      return;
    }
    if(this.selected_option==="TXT"){
      //bot code
      if((val['enter_input'] || val['enter_text']) === ''|| (val['enter_input'] || val['enter_text']) === null){
        this.popup_msg("Empty input field at 'INPUT' section");
        return
      }
      let waitForSelector = "await page.waitForSelector(" + '"' + val['enter_input'] + '"' + ");";
      let eval_var = "await page.$eval(" + '"' + val['enter_input'] + '", el => el.value = ' + '"' + val['enter_text'] + '"' + ");"
      //console.log(waitForSelector);
      //console.log(eval_var);
      this.bot_codes.push(waitForSelector + eval_var);
      this.bot_code_name.push('Go to ' + val['enter_input'] + ' input field & type ' + val['enter_text']);
      console.log(this.bot_codes);
      console.log(this.bot_code_name);
      return
    }
    if(this.selected_option==="SS"){
      //bot code
      if(val['enter_path']==='' || val['enter_path']=== null){
        this.popup_msg("Empty input field at 'SCREENSHOT' section");
        return
      }
      let screenshot = "await page.screenshot({fullPage: true, path: " + '"' + val['enter_path'] + '.png"}' + ");";
      //console.log(screenshot);
      this.bot_codes.push(screenshot);
      this.bot_code_name.push('Screenshot file name is ' + val['enter_input']);
      console.log(this.bot_codes);
      return
    }
    if(this.selected_option==="END"){
      //bot code
      let end = "await page.close();";
      //console.log(end);
      this.bot_codes.push(end);
      this.bot_code_name.push('Bot ends here');
      console.log(this.bot_codes);
      return
    }
  }

  open(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
     console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  popup_msg(msg: string){
    this.snackBar.open(msg,"Close", {duration: 5000, panelClass: "popup_msg"})
  }

}
