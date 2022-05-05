import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BotServiceService } from 'src/service/bot-service.service';
import  Bot  from 'src/service/bot-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-yourbot',
  templateUrl: './yourbot.component.html',
  styleUrls: ['./yourbot.component.css']
})
export class YourbotComponent implements OnInit {
  @Input() fromParent: string | undefined;
  constructor(private botService: BotServiceService, public activeModal: NgbActiveModal,private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    //console.log(this.fromParent);
  }

  closeModal(val: any) {
    this.activeModal.close(val);
    //console.log('close');
  }

}
