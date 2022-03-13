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
    #1: Design the delete modal
    #2: Add loading screen when 'del' btn is clicked
    #2: Design the highlight
    #3: Allow user to add more steps inbetween others (done)
  */

  delete(){
    this.fromParent.steps_array.splice(this.fromParent.delete_index,1);
    this.fromParent.steps_array_name.splice(this.fromParent.delete_index,1);
    this.activeModal.close(this.fromParent);
    //console.log('delete')
  }

  closeModal() {
    this.activeModal.close();
    //console.log('close');
  }



}
