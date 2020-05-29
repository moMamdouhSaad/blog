import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

   signUpForm:FormGroup = new FormGroup({
     email: new FormControl('',[Validators.required]),
     username: new FormControl('',[Validators.required]),
     password: new FormControl('',[Validators.required]),
     cPassword: new FormControl('',[Validators.required]),
     imageURL: new FormControl('',[Validators.required])
   });
   
   fb;
   downloadURL: Observable<string>;

  constructor(private authService: AuthService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  signUp(){
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const userData = {
     email: this.signUpForm.get('email').value,
     password: this.signUpForm.get('password').value,
     username: this.signUpForm.get('username').value,
     imageURL: this.signUpForm.get('imageURL').value   
    }
    this.authService.signUp(userData) 
  }

  onFileSelected(event){
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    console.log(filePath);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fb = url;
          }
          console.log(this.fb);
          this.signUpForm.patchValue({imageURL:this.fb})

        });
      })
    )
    .subscribe(url => {
      if (url) {
        console.log(url);
      }
    });

    
  }

}
