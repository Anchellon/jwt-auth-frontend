import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap,share } from "rxjs/operators"
import * as moment from "moment";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // The Auth service is expected to handle
  //  1.Loggin In
  //  2.Setting the session
  //  3.logging out
  //  We need to be able to track whether a user is logged in or not.
  //  Essentially we need to keep a variable that tracks this
  //  Since this variable changes over time asynchronously we use a behavoiur subjec because
  //    1. It needs to be initialized to whatever was there else to null if not present
  //    2. value changes over time like a regular variable

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken())
  constructor(private http: HttpClient) { }

  private hasToken():boolean{
    console.log("checking whether we have a token or not")
    return !!localStorage.getItem('currentUser');
  }

  private setSession(token){
    console.log("recieving the response")
    console.log("logging the recieved value")
    console.log(token)
    console.log("keys of the token : " + Object.keys(token))
    console.log("setting the local storage")
    localStorage.setItem('currentUser', JSON.stringify(token));
    token = JSON.parse(localStorage.getItem('currentUser'))
    let access_token = token["access"]
    let token_vals = JSON.parse(atob(access_token.split('.')[1]))
    console.log(token_vals)
    console.log("******************")
    console.log("please work")
    console.log("emitting true")
    this.isLoginSubject.next(true)
    console.log(this.isLoginSubject.value) 
    console.log("emitting true done")   
        
  }

  login(email:string, password:string ){
    console.log("email: ", email, "password: ",password)
    console.log("posting the data")
    return this.http.post('http://127.0.0.1:8000/api/token/', {email, password}).pipe(
      tap(token => this.setSession(token)
        
        // only transformations of the stream so still an observable 
        // this is not to be acted on as it is not the location of actual subscribing
      ,share)
    )
  }
  logout():void{
    console.log("removing")
    localStorage.removeItem('currentUser');
    console.log("emitting false v")
    this.isLoginSubject.next(false)
    console.log("emitting finish")
  }
  isLoggedIn() : Observable<boolean> {
    console.log("the shift ?")
    return this.isLoginSubject.asObservable();
  }
  
}
