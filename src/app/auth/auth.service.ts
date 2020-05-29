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
  public loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!sessionStorage.getItem('user'));

  constructor(private _firebaseAuth: AngularFireAuth,private firestore: AngularFirestore , private loaderService: LoaderService,private router: Router) {
    this.user = _firebaseAuth.authState;
   }

   signUp(userData: any){
      this._firebaseAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password).then(res=>{
        this.setUserData(userData);
        console.log('successfuly registered', res)
      })
      .catch(error=>console.log('Something is wrong:', error.message))
   }

   signInWithEmailAndPassword(email: string, password: string){
     this.loaderService.setLoader(true);
      this._firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(res=>{
        const userID = this._firebaseAuth.auth.currentUser.uid;
        this.firestore.collection(`users`).valueChanges().pipe(map((x:any)=>x.filter(y=>y.userID == userID)))
        .subscribe(data=>{
          const profile = {
            name: data[0].username,
            picture:data[0].imageURL
          }
          this.setCurrentUser(profile);
          this.router.navigate(['/']);
          this.loaderService.setLoader(false);
        })
        console.log('successfuly logged in', res)
      })
      .catch(error=>console.log('Something is wrong:', error.message));

      }
      // AngularFirestoreDocument
   setUserData(userData:any){
        const userDetails = {
          userID: this._firebaseAuth.auth.currentUser.uid,
          username: userData.username,
          imageURL: userData.imageURL
    }
    console.log(userDetails)
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
    this.setStorageItems(profile);
    this.loggedIn.next(true);
}

  getCurrentUser(): string | any {
  return sessionStorage.getItem('user') || undefined;
  }
  getCurrentUserPicture(): string | any {
    return sessionStorage.getItem('img') || undefined;
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

  setStorageItems(profile){
    sessionStorage.setItem('user', profile.name);
    sessionStorage.setItem('img', profile.picture);
  }

  clearStorageItems(): void{
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('img');
  }
}
