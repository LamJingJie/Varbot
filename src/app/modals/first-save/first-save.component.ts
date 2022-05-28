import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BotServiceService } from 'src/service/bot-service.service';
import  Bot  from 'src/service/bot-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-first-save',
  templateUrl: './first-save.component.html',
  styleUrls: ['./first-save.component.css']
})
export class FirstSaveComponent implements OnInit {
  @Input() fromParent: Bot | undefined;
  first_save_form: FormGroup;
  constructor(private snackBar: MatSnackBar, private botService: BotServiceService, public activeModal: NgbActiveModal,private formBuilder: FormBuilder,) {
    this.first_save_form = this.formBuilder.group({
    
      name: new FormControl('', [
        Validators.required
      ])
  
    });
   }

  ngOnInit(): void {
    //console.log(this.fromParent);
  }

  save(val: any){
    //console.log(val);
    this.fromParent!.name = val.name
    //console.log(this.fromParent);
    this.botService.add(this.fromParent!).then((res=>{
      let data: any ={
        bot_name: val.name,
        bot_id: res.key
      }
      //console.log(res);
      this.popup_msg("Bot Saved");
      this.closeModal(data);
      
    }));
   
  }
  
  closeModal(val: any) {
    this.activeModal.close(val);
    //console.log('close');
  }

  popup_msg(msg: string){
    this.snackBar.open(msg,"Close", {duration: 5000, panelClass: "popup_msg"})
  }

  get name(){
    return this.first_save_form.get('name');
  }

}
