import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BotServiceService } from 'src/service/bot-service.service';
import  Bot  from 'src/service/bot-service.service';
@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  bot: Bot = new Bot();

  @Input() fromParent: any;
  constructor(private botService: BotServiceService, public activeModal: NgbActiveModal) { }


  ngOnInit(){
    //console.log(this.fromParent);
  }
 


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
