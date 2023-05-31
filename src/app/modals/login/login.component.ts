import { Component, OnInit, Input } from '@angular/core';
import { trigger,state, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../service/authentication.service';
import { UserService, User } from '../../../service/user.service';
import { ForgotPasswordComponent } from "../../modals/forgot-password/forgot-password.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login_form: FormGroup;
  constructor(private snackBar: MatSnackBar, private modalService: NgbModal, private authService: AuthenticationService, private formBuilder: FormBuilder, public activeModal: NgbActiveModal) {

    this.login_form = this.formBuilder.group({
    
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        //At least one digit
        //At least one lowercase character
        //At least one uppercase character
        //At least one special character
        //At least 8 characters in length, but no more than 64.
        Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]]+'),
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(64)
      ]),
  
    });

   }

  ngOnInit(): void {
  }

  login(val: any){

    this.authService.login(val.email, val.password).then((res=>{
      
      //console.log(res);
      this.popup_msg("Logged In!");
      this.closeModal();
    })).catch((err =>{
      this.popup_msg("Incorrect Email or Password");
      //console.log(err);
    }));
  }

  google(){
    this.authService.GoogleAuth().then((res=>{
      //console.log("Google Login");
      this.popup_msg("Logged In By Google");
      this.closeModal();
    }));
  }

  forget_password(){
    //#Go to the next modal
    
    const ForgotPasswordModalRef = this.modalService.open(ForgotPasswordComponent,
      {
        scrollable: true,
        windowClass: 'ForgotPasswordModalClass',
        backdrop: false,
        modalDialogClass:"modal-side modal-top-right"
      });

      
  }

  get email() { return this.login_form.get('email'); }
  get password() { return this.login_form.get('password'); }

  popup_msg(msg: string){
    this.snackBar.open(msg,"Close", {duration: 5000, panelClass: "popup_msg"})
  }

  closeModal() {
    this.activeModal.close();
    //console.log('close');
  }

}
