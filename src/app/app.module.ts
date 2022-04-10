import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from'@angular/material/icon';
import { SignupComponent } from './modals/signup/signup.component';
import { LoginComponent } from './modals/login/login.component';
import { ForgotPasswordComponent } from './modals/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeleteModalComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,

  ],
  entryComponents:[
    DeleteModalComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'varbot'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule ,
    RouterModule.forRoot([
      {path: '', component: HomeComponent}
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
