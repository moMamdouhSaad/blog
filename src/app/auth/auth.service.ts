import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, filter } from 'rxjs/operators';
import { LoaderService } from '../shared/services/loader.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  public loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!localStorage.getItem('currentUser'));
  private currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  constructor(private _firebaseAuth: AngularFireAuth, 
     private firestore: AngularFirestore,
     private loaderService: LoaderService, 
     private router: Router)
      {
    this.user = _firebaseAuth.authState;
      }

   signUp(userData: any){
     return this._firebaseAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password).then(res=>{
        this.saveUserDetails(userData);
        console.log('successfuly registered', res)
      })
      .catch(error=>console.log('Something is wrong:', error.message))
   }

   signInWithEmailAndPassword(email: string, password: string){
     this.loaderService.setLoader(true);
     this._firebaseAuth.auth.signInWithEmailAndPassword(email, password)
     .then(res=>{
        const userID = this._firebaseAuth.auth.currentUser.uid;
        this.firestore.collection(`users`).valueChanges().pipe(map((x:any)=>x.filter(y=>y.userID == userID)))
        .subscribe(data=>{
          const profile = {username: data[0].username,imageURL: data[0].imageURL,role: data[0].role}
          this.setCurrentUser(profile);
          this.router.navigate(['/'])
          this.loaderService.setLoader(false);
        })
        console.log('successfuly logged in', res)
      })
      .catch(error=>{
        console.log('Something is wrong:', error.message);
        this.loaderService.setLoader(false);
      });
      }

      
      // AngularngDocument
   saveUserDetails(user:any){ // save user in users collection at firebase
        const userDetails = {
          userID: this._firebaseAuth.auth.currentUser.uid,
          username: user.username,
          imageURL: user.imageURL,
          role: user.role
    }
         this.firestore.collection('users').add(userDetails)
         .then(res => {console.log('userdetails added')})
         .catch(err=> console.log(err))
  }  
  

   signInWithFacebook(){
     return this._firebaseAuth.auth.signInWithRedirect(
       new firebase.auth.FacebookAuthProvider()
     )
   }

   signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  setCurrentUser(profile: any): void {
    this.currentUserSubject.next(JSON.stringify(profile));
    localStorage.setItem('currentUser', JSON.stringify(profile));
    this.loggedIn.next(true);
  }

  getCurrentUserName(): string | any {
  return JSON.parse(localStorage.getItem('currentUser')).username || undefined;
  }
  getCurrentUserPicture(): string | any {
    return JSON.parse(localStorage.getItem('currentUser')).imageURL || undefined;
  }
  getUserRole(): string | any{
    return JSON.parse(localStorage.getItem('currentUser')).role || undefined;
  }

  isLoggedIn$() {
    return this.loggedIn.asObservable();
  }

  logout() {
      this.loaderService.setLoader(true);
      this.clearStorageItems();
      this.loggedIn.next(false);

      this._firebaseAuth.auth.signOut()
      .then((res) => {
        this.router.navigate(['/'])
        this.loaderService.setLoader(false)
      })
      .catch(err=>console.log('err', err))
  }

  clearStorageItems(): void{
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(){
    return this.currentUserSubject.value;
  }

 
}
