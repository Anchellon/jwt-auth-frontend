import { Injectable } from '@angular/core';
import { SignUpData } from './sign-up-data';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
  postSignUpData(signUpData : SignUpData):Observable<any>{
    return this.http.post("http://127.0.0.1:8000/users/",signUpData)
  }
}
