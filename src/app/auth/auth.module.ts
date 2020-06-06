import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/storage";
import { SharedModule } from '../shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [LoginComponent],
  providers: [AngularFirestore, AngularFireStorage]
})
export class AuthModule { }
