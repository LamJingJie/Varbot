import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidation } from '../../../class/custom-validation';
import { AuthenticationService } from '../../../service/authentication.service';
import { UserService, User } from '../../../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signup_form: FormGroup;
  constructor( public afAuth: AngularFireAuth, private authService: AuthenticationService, private userService: UserService, private formBuilder: FormBuilder , public activeModal: NgbActiveModal) {
 
    this.signup_form = this.formBuilder.group(
      {
        email: new FormControl('',[
          Validators.email,
          Validators.required
        ]),
        name: new FormControl('', [
          Validators.minLength(3),
          Validators.required,
          //Only allow letters either uppercase or lowercase
          //Validators.pattern('(?=.*[A-z]).{3,}')
          Validators.pattern('^[a-zA-Z \-\']+')
        ]),
        password: new FormControl('', [
          //At least one digit
          //At least one lowercase character
          //At least one uppercase character
          //At least one special character
          //At least 7 characters in length, but no more than 32.
          Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@]+'),
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(32)
        ]),
        confirm_password: new FormControl('',[
          Validators.required
        ]),
      },
      {
        validators: CustomValidation.mustMatch('password','confirm_password')
      } as AbstractControlOptions //removed the depracation warning in the 'group' method
    )

   }
  

  ngOnInit(): void {
   
  }

  signup(val: any){
    //console.log(val.name);
    let userData: User ={
      name: val['name'],
      email: val.email
    }
    //console.log(userData);
    this.authService.SignUp(val.email, userData, val.password).then(()=>{
      this.closeModal();
    });
  }

  closeModal() {
    this.activeModal.close();
    //console.log('close');
  }

  test(){
    console.log(this.authService.isLoggedIn);
    console.log(this.authService.loginUserDetail);
  }


  get name() { return this.signup_form.get('name'); }
  get email() { return this.signup_form.get('email'); }
  get password() { return this.signup_form.get('password'); }
  get confirm_password() { return this.signup_form.get('confirm_password'); }

}
