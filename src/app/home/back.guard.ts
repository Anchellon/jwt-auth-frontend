import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../data/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackGuard implements CanActivate, CanDeactivate<unknown> {
  isLoggedIn:boolean
  constructor(private authService:AuthService){  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authService.isLoggedIn().subscribe(
      val => this.isLoggedIn = val
    )
    return !this.isLoggedIn
  }
  
}
