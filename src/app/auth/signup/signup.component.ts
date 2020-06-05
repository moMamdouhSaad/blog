import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  file:any;
  filePath:any;
  fileRef:any;
  task:any;

   signUpForm:FormGroup = new FormGroup({
     email: new FormControl('',[Validators.required]),
     username: new FormControl('',[Validators.required]),
     password: new FormControl('',[Validators.required]),
     cPassword: new FormControl('',[Validators.required]),
     imageURL: new FormControl('',[Validators.required])
   });
   
   fb;
   downloadURL: Observable<string>;

  constructor(private authService: AuthService, private storage: AngularFireStorage, private loaderService: LoaderService, private router: Router) { }

  ngOnInit(): void {
  }
  signUp(){
    console.log("???? hena")
    this.loaderService.setLoader(true);
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const userData = {
     email: this.signUpForm.get('email').value,
     password: this.signUpForm.get('password').value,
     username: this.signUpForm.get('username').value,
     imageURL: this.signUpForm.get('imageURL').value   
    }
    this.task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = this.fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fb = url;
          }
          console.log(this.fb);
          this.signUpForm.patchValue({imageURL:this.fb})
          console.log(userData);
          console.log(this.signUpForm.value)
          this.authService.signUp(this.signUpForm.value).then(()=>{
            this.loaderService.setLoader(false);
            this.authService.signInWithEmailAndPassword(userData.email, userData.password)
          }).catch(e=>console.log(e))
         
          // this.router.navigate(['/']);
        });
      })
    )
    .subscribe(url => {
      
    });


  }

  onFileSelected(event){
    var n = Date.now();
    this.file = event.target.files[0];
    this.filePath = `RoomsImages/${n}`;
    console.log(this.filePath);
    this.fileRef = this.storage.ref(this.filePath);
    this.task = this.storage.upload(this.filePath, this.file);
        
  }

}
