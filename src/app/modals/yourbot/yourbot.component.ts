import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BotServiceService } from 'src/service/bot-service.service';
import  Bot  from 'src/service/bot-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-yourbot',
  templateUrl: './yourbot.component.html',
  styleUrls: ['./yourbot.component.css']
})
export class YourbotComponent implements OnInit {
  @Input() fromParent: string | undefined;
  bots: any[] | undefined;
  getAll_Subscription: Subscription | undefined;
  constructor(private snackBar: MatSnackBar, private botService: BotServiceService, public activeModal: NgbActiveModal,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    
    //console.log(this.fromParent);
    this.getAll_Subscription = this.botService.getAll().pipe(
      map(changes =>
        //gets the uid of each bot and add them into the objects in the array
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() as Record<string, unknown> })
        )
      )
    ).subscribe(data => {
      console.log(data);
      //Change to descending
      this.bots = data.reverse();
      
    });
  }

  selectBot(data: any){
    //console.log(data);
    this.closeModal(data);
  }

  delete(key: string, name: string){
    if(confirm("Are you sure you want to delete " + "'" + name + "'?")){
      this.botService.delete(key).then((res=>{
        this.popup_msg(name + " Deleted")
      })).catch((err=>{
        console.log(err);
      }));
    }
  }

  ngOnDestroy(){
    console.log("Destroy");
    if(this.getAll_Subscription){
      this.getAll_Subscription?.unsubscribe();
    }
    
  }

  popup_msg(msg: string){
    this.snackBar.open(msg,"Close", {duration: 5000, panelClass: "popup_msg"})
  }


  closeModal(val: any) {
    this.activeModal.close(val);
    //console.log('close');
  }

}
