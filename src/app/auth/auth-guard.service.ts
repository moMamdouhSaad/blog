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
    const currentUser = this.authService.getCurrentUser();  
    console.log(currentUser)  
    if (currentUser){
      console.log(route.data.roles.indexOf(currentUser.role));
      if(route.data.roles.indexOf(currentUser.role) === -1 ){
        this.router.navigate(['/']);
        return false;
      }
      return true
    }
    else{
        this.router.navigate(['/']);
        return false
    }
  }
}
