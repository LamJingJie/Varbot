import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  automation_section_form = new FormGroup({
    enter_input: new FormControl(''),
    enter_path: new FormControl(''),
    enter_text: new FormControl(''),

  });

  url_section:boolean = false;

  selected_option:any;

  constructor() { }

  ngOnInit(){
    document.getElementById('selection_click')?.focus();
    this.selected_option = "CLICK";
    this.selection_btn(this.selected_option);
  }

  //Change btn background permanently when clicked.
  selection_btn(selectionType: string){
    console.log(selectionType);
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
  add_code(){
    console.log('hi');
  }

  Test(){
    console.log("HIIII")
  }

  send_email(){
    console.log("Email sent!");
  }

}
