import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    let returnedValue:boolean;
     this.authService.isLoggedIn$().subscribe(data=>{
       returnedValue = data;
      // if(data == true){
      //   return  true
      // }else{
      //   this.router.navigate(['/']);
      //   return false
      // }
    })
    
    if (returnedValue){
      return true
    }else{
        this.router.navigate(['/']);
        return false
    }
    return returnedValue
  }
}
