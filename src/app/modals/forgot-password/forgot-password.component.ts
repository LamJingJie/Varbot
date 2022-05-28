import { Component, OnInit, Input } from '@angular/core';
import { trigger,state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../service/authentication.service';
import { UserService, User } from '../../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
 
})
export class ForgotPasswordComponent implements OnInit {
  forget_password_form: FormGroup;
  constructor(private snackBar: MatSnackBar, private userService: UserService, private modalService: NgbModal, private authService: AuthenticationService, private formBuilder: FormBuilder, public activeModal: NgbActiveModal) 
  {
    this.forget_password_form = this.formBuilder.group({
    
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ])
  
    });
   }

  ngOnInit(): void {
  }

  async forgetPassword(val: any) {
    const data = this.userService.userExists(val.email);
    data.then((res => {
      console.log(res);
      if (res) {
        //Send reset email
        this.authService.resetPassword(val.email).then((res => {
          this.popup_msg("Email sent. Please check your inbox/Spam");
          this.closeModal();
        }))
      }else{
        console.log("Email doesn't exist")
      }
    }))
  }

  get email() { return this.forget_password_form.get('email'); }

  popup_msg(msg: string){
    this.snackBar.open(msg,"Close", {duration: 5000, panelClass: "popup_msg"})
  }

  closeModal() {
    this.activeModal.close();
    //console.log('close');
  }

}
