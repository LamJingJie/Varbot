import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_form: FormGroup;
  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal) {

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
        //At least 8 characters in length, but no more than 32.
        Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@]+'),
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(32)
      ]),
  
    });

   }

  ngOnInit(): void {
  }

  login(val: string){
    console.log(val);
  }

  get email() { return this.login_form.get('email'); }
  get password() { return this.login_form.get('password'); }

  closeModal() {
    this.activeModal.close();
    //console.log('close');
  }

}
