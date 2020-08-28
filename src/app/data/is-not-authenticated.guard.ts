import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthenticatedGuard implements CanActivate {
  constructor(private authService :AuthService,private router:Router){}
  logInState:boolean
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.isLoggedIn().subscribe(
        val => this.logInState = val
      )
      if(this.logInState){
        this.router.navigate(['welcome'])
      }
      return !this.logInState;
  }
  
}
