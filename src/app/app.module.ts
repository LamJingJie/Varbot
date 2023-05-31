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
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from'@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import {MatBadgeModule} from '@angular/material/badge';
import {MatInputModule} from '@angular/material/input';


import { HomeComponent } from './home/home.component';


import { SignupComponent } from './modals/signup/signup.component';
import { LoginComponent } from './modals/login/login.component';
import { ForgotPasswordComponent } from './modals/forgot-password/forgot-password.component';
import { FirstSaveComponent } from './modals/first-save/first-save.component';
import { YourbotComponent } from './modals/yourbot/yourbot.component';
import { ProfileComponent } from './modals/profile/profile.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeleteModalComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    FirstSaveComponent,
    YourbotComponent,
    ProfileComponent,

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
    MatInputModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatBadgeModule,
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
