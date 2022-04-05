import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { BotsService } from '../shared/bots.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from "ngx-spinner";
import { DeleteModalComponent } from "../modals/delete-modal/delete-modal.component";
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoginComponent } from "../modals/login/login.component";
import { SignupComponent } from "../modals/signup/signup.component";

//Services 
import { BotServiceService } from 'src/service/bot-service.service';
import { AuthenticationService } from 'src/service/authentication.service';
import  Bot  from 'src/service/bot-service.service';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url_section_form = new FormGroup({
    enter_website: new FormControl(''),
  });

  bot: Bot = new Bot();
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

  //Store the previous highlighted ID
  prev_id:number = -1;

  //ID of the currently selected index/id
  current_id_selected: number = -1;

  

  constructor(private authService: AuthenticationService, private botServiceService: BotServiceService,private db: AngularFireDatabase, private spinner: NgxSpinnerService, private snackBar: MatSnackBar, private modalService: NgbModal, private cdRef:ChangeDetectorRef, private botService: BotsService) {  this.modalOptions = {
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
    //console.log(url);
    //console.log(code);
    this.bot_codes[0] = code;
    this.bot_code_name[0] = 'Open to ' +'"'+ url.href + '"';
    let last_index = this.bot_codes.lastIndexOf(code);
    console.log(last_index);
    this.highlight_steps(last_index);
    //this.set_Style_For_Instruction_Steps_Last_Item();
    //console.log(this.bot_code_name);
    console.log(this.bot_codes);
    /*this.botService.runBots(this.bot_codes).then((result: any)=>{
      console.log(result);
    });*/
     
  }

  //Section 2
  async add_code(val: any){
    //console.log(val);
    //console.log(this.selected_option);
    if(this.bot_codes.length <= 0){
      this.popup_msg("Please provide the WEBSITE URL to continue.");
      return
    }

    if(this.bot_code_name.includes('Bot ends here')){
      this.popup_msg("No adding of instructions after you have ended it.");
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
      this.bot_codes.splice(this.current_id_selected + 1, 0, waitForSelector + click);
      //this.bot_codes.push(waitForSelector + click);
      this.bot_code_name.splice(this.current_id_selected + 1, 0, 'Click on ' + '"'+ val['enter_input'] + '"')
      console.log(this.bot_codes);
      console.log(this.current_id_selected);
      //console.log(this.bot_code_name);
      //await this.set_Style_For_Instruction_Steps_Last_Item();
      return;
    }
    if(this.selected_option==="TXT"){
      //bot code
      if((val['enter_input'] && val['enter_text']) === ''|| (val['enter_input'] && val['enter_text']) === null){
        this.popup_msg("Empty input fields at 'INPUT' section");
        return
      }
      let waitForSelector = "await page.waitForSelector(" + '"' + val['enter_input'] + '"' + ");";
      let eval_var = "await page.$eval(" + '"' + val['enter_input'] + '", el => el.value = ' + '"' + val['enter_text'] + '"' + ");"
      //console.log(waitForSelector);
      //console.log(eval_var);

      //Added +1 so that it will push the new item below the top item
      this.bot_codes.splice(this.current_id_selected + 1, 0, waitForSelector + eval_var);
      this.bot_code_name.splice(this.current_id_selected + 1, 0,'Go to ' + val['enter_input'] + ' input field & type ' +'"' + val['enter_text'] + '"');
      //console.log(this.bot_codes);
      //console.log(this.bot_code_name);
      //await this.set_Style_For_Instruction_Steps_Last_Item();
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
      this.bot_codes.splice(this.current_id_selected + 1, 0,screenshot);
      this.bot_code_name.splice(this.current_id_selected + 1, 0,'Screenshot file name is ' +'"' +  val['enter_path'] + '"');
      //console.log(this.bot_codes);
      //await this.set_Style_For_Instruction_Steps_Last_Item();
      return
    }
    if(this.selected_option==="END"){
      //bot code
      let end = "await page.close();";
      //console.log(end);
      this.bot_codes.push(end);
      this.bot_code_name.push('Bot ends here');
      //console.log(this.bot_codes);
      //await this.set_Style_For_Instruction_Steps_Last_Item();
      return
    }

    
  }

  //Run the steps for the bot
  async run_bot(){
    console.log('bot run');
    await this.spinner.show('bot');
    this.botService.runBots(this.bot_codes).then((result: any)=>{
      console.log(result);
      this.spinner.hide('bot');
    }).catch(err=>{
      console.log(err);
      this.popup_msg(err);
      this.spinner.hide();
    });
  }

  //Modal popup for 'help'
  open(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
     console.log(result);
    }, (reason) => {
      console.log(reason);
    }).catch((err=>{
      this.popup_msg(err);
    }));
  }


  popup_msg(msg: string){
    this.snackBar.open(msg,"Close", {duration: 5000, panelClass: "popup_msg"})
  }
  
  //when user clicks on delete steps
  openDeletePopup(index: number, steps: string){
    //console.log("Delete " + index);
    //#TASK1: Add popup box for confirmation
    const deleteModalRef = this.modalService.open(DeleteModalComponent,
      {
        scrollable:true,
        windowClass: 'deleteModalClass'
      });

    let data: any = {
      delete_index: index,
      delete_step: steps,
      steps_array: this.bot_codes,
      steps_array_name: this.bot_code_name
    }

    deleteModalRef.componentInstance.fromParent = data;
    deleteModalRef.result.then(async (result) => {
      console.log(result);
      
      if(result === null || result === '' || result === undefined){
        return;
      }

      //update array
      this.spinner.show("del");
      this.bot_codes = result.steps_array;
      this.bot_code_name = result.steps_array_name;
      
      //highlight the step above
      if(index > 0){
        this.highlight_steps(index - 1);
      }    

      //No step above, highlight the step below
      if(index <= 0){
        this.highlight_steps(index+1);
      }

      this.popup_msg("Deleted successfully!");   
      this.spinner.hide("del");

    }, (reason) => {
      console.log(reason);
    }).catch((err=>{
      this.popup_msg(err);
    }));
   
  }

  //Highlight a step onclick
  async highlight_steps(id:number){

    this.current_id_selected = id;

    //Mini-delay before executing to allow the new item to be loaded into the frontend.
    //So that we are able to retrieve the new ID.
    await this.delay(10);
    let element_highlight = document.getElementById("highlightSteps_" + id);
    let element_instruction_steps = document.getElementById("instructionSteps_" + id);
    
    //console.log(element_highlight);
    //console.log(this.prev_id);
    /*if (this.prev_id === -1) {
      //On the 1st click(when the page first load)
      element_highlight?.classList.add("highlight_steps_background");
      element_instruction_steps?.classList.add("padding_down");
      this.prev_id = id;
      //console.log(this.prev_id);
      return
    }*/

    //after the 1st click onwards
    let element_prev_highlight = document.getElementById("highlightSteps_" + this.prev_id);
    let element_prev_instruction_steps = document.getElementById("instructionSteps_" + this.prev_id);
   
    //console.log(element_prev_highlight);
    //Remove prev highlight styling
    if (element_prev_highlight?.classList.contains("highlight_steps_background")) {
      element_prev_highlight?.classList.remove("highlight_steps_background");
      //console.log("Removed");
    }

    if (element_prev_instruction_steps?.classList.contains("padding_down")) {
      element_prev_instruction_steps?.classList.remove("padding_down");
      //console.log("Removed");
    }

    //add to current highlight
    element_highlight?.classList.add("highlight_steps_background");
    element_instruction_steps?.classList.add("padding_down");
    this.prev_id = id;
    return;
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  Save(){
    let getAll_Subscription: Subscription;
    let dateTime = Date.now();

    this.bot.lists_code = this.bot_codes;
    this.bot.lists_desc = this.bot_code_name;
    this.bot.last_saved = dateTime;
    //console.log(this.bot);
    this.botServiceService.add(this.bot);

    /*this.botServiceService.get("-Mz4iriVgjbuAGXpqMe6").then(snapshot=>{
      console.log(snapshot.val());
      console.log(snapshot.key);
    });*/
    
    /*getAll_Subscription = this.botServiceService.getAll().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      console.log(data);
    });*/

    //this.botServiceService.update("-Mz4iriVgjbuAGXpqMe6",this.bot);

    //console.log(this.botServiceService.get("-Mz4iriVgjbuAGXpqMe6"));
    
  }



  //Account related

  account(){
    //#1: Show both their bots and name changing option in a modal
    console.log('account');
  }

  login(){
    console.log('login');
    //this.popup_msg('Logged In Successfully');
    //LoginComponent
    const LoginModalRef = this.modalService.open(LoginComponent,
      {
        scrollable: true,
        windowClass: 'LoginModalClass'
      });

      LoginModalRef.result.then(async (result) => {
      console.log(result);


    }, (reason) => {
      console.log(reason);
    }).catch((err => {
      this.popup_msg(err);
    }));
    
  }

  signup(){
    //#1: Signup by google account
    console.log('signup');
    //this.popup_msg('Signed Up Successfully');
    const SignupModalRef = this.modalService.open(SignupComponent,
      {
        scrollable: true,
        windowClass: 'SignupModalClass'
      });

      SignupModalRef.result.then(async (result) => {
      console.log(result);


    }, (reason) => {
      console.log(reason);
    }).catch((err => {
      this.popup_msg(err);
    }));
  }

  logout(){
    console.log('logout');
    this.popup_msg('Logged Out Successfully');
  }
  /*openAuthModal(type: string){
    const AuthModalRef = this.modalService.open(AuthenticateComponent,
      {
        scrollable:true,
        windowClass: 'AuthModalClass'
      });

      let data: any = {
        type: type
      }
  
      AuthModalRef.componentInstance.fromParent = data;
      AuthModalRef.result.then(async (result) => {
        console.log(result);

  
      }, (reason) => {
        console.log(reason);
      }).catch((err=>{
        this.popup_msg(err);
      }));
  }*/
  }
  


