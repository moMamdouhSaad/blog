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
  fb:any;
  downloadURL: Observable<string>;

   signUpForm:FormGroup = new FormGroup({
     email: new FormControl('',[Validators.required]),
     username: new FormControl('',[Validators.required]),
     password: new FormControl('',[Validators.required]),
     cPassword: new FormControl('',[Validators.required]),
     imageURL: new FormControl('',[Validators.required]),
     role: new FormControl('user')
   });
   
  

  constructor(private authService: AuthService, private storage: AngularFireStorage, private loaderService: LoaderService, private router: Router) { }

  ngOnInit(): void {
  }
  signUp(){
    this.loaderService.setLoader(true);
    this.task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = this.fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fb = url;
          }
          this.signUpForm.patchValue({imageURL:this.fb})
          this.authService.signUp(this.signUpForm.value).then(()=>{
            this.loaderService.setLoader(false);
            this.authService.signInWithEmailAndPassword(this.signUpForm.get('email').value, this.signUpForm.get('password').value)
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
