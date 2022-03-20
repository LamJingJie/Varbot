import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @Input() fromParent: any;
  constructor( public activeModal: NgbActiveModal) { }
  array: Array<string> = [];

  ngOnInit(){
    //console.log(this.fromParent);
  }
  /*Tasks
    #1: Design the delete modal (done)
    #2: Add loading screen when 'del' btn is clicked (done)
    #3: Add login function
    #4: Add 'hint' function (done)
  */

  delete(){

    //If the website url is to be deleted
    if(this.fromParent.delete_index === 0){
      //Delete everything after index '0'
      this.fromParent.steps_array.splice(this.fromParent.delete_index);
      this.fromParent.steps_array_name.splice(this.fromParent.delete_index);
      console.log(this.fromParent.steps_array);
    }else{
      //Delete that only
      this.fromParent.steps_array.splice(this.fromParent.delete_index,1);
      this.fromParent.steps_array_name.splice(this.fromParent.delete_index,1);
    }
    
    this.activeModal.close(this.fromParent);
    //console.log('delete')
  }

  closeModal() {
    this.activeModal.close();
    //console.log('close');
  }



}
