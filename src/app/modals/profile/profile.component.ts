import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BotServiceService } from 'src/service/bot-service.service';
import  Bot  from 'src/service/bot-service.service';
import { AuthenticationService } from 'src/service/authentication.service';
import { UserService } from 'src/service/user.service';
import {User} from 'src/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  edited: boolean | undefined;

  constructor(private userService: UserService,private authService: AuthenticationService, private botService: BotServiceService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.edited = false;
    this.user = this.authService.loginUserDetail;
    //console.log(this.user);
  }

  change(){
    this.edited = true;
  }

  edit(name: string){
    let user: User={
      name: name,
      email: this.user.email
    }
    //console.log(user);
    this.authService.updateProfile(user).then((res=>{
      this.edited = false;
    }));
    this.userService.update(this.user.uid, user);
    
  }

  closeModal(){
    this.activeModal.close();
  }

}
