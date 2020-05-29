import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private zone: NgZone) { }

  signUpForm:FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  }) 

  ngOnInit(): void {
  }

  signInWithEmailAndPassword(){
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.authService.signInWithEmailAndPassword(email, password)
  }

  signInWithFacebook(){
    this.authService.signInWithFacebook().then((res)=>{
      this.router.navigate(['/dasdsa'])
    }
    ).catch((err)=>{
      console.log(err)
    })
  }

   signInWithGoogle(){
    this.authService.signInWithGoogle().then((res:any)=>{
      console.log(res.additionalUserInfo.profile)
      this.authService.setCurrentUser(res.additionalUserInfo.profile)
      // this.router.navigate(['/'])
      this.zone.run(() => { this.router.navigate(['/'])})

    }).catch((err)=>console.log(err))
  }

}
