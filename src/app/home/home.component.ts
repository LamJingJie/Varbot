import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
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
  modalOptions:NgbModalOptions;

  url_section:boolean = false;

  selected_option= '';

  constructor( private modalService: NgbModal, private cdRef:ChangeDetectorRef) {  this.modalOptions = {
    backdropClass:'customBackdrop'
  }}

  ngOnInit(){
    document.getElementById('selection_click')?.focus();
    this.selection_btn('CLICK');
  }

  //Change btn background permanently when clicked.
  async selection_btn(selectionType: string){
    console.log(selectionType);
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
  add_code(){
    console.log('hi');
    console.log(this.automation_section_form.value);
  }

  Test(){
    console.log("HIIII")
  }

  open(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
     console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  send_email(){
    console.log("Email sent!");
  }

}
