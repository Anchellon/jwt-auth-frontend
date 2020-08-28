import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/data/auth.service'
import { LoginData } from 'src/app/data/login-data'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  login_data: LoginData ={
    email:"",
    password:"",
  }
  constructor(private authService:AuthService,private router: Router) { 
  }
  
  successFunc(){
    console.log("user success")
    // console.log(this.a)

  }
  errorFunc(){
    console.log("error")
  }
 
  
  
  logInObserver={
    next:this.successFunc,
    error:this.errorFunc,
    complete:()=>{
      
      this.router.navigate(['home'])
    }  
  }



 
  ngOnInit(): void {
   
    // if(this.authService.isLoggedIn().subscribe(vals=>console.log(vals))){
    //   console.log()
    //   this.router.navigate(['home'])
    // }
  }
  onSubmit(form:NgForm){
    this.authService.login(this.login_data.email,this.login_data.password).subscribe(
      // the response object we got is a jwt. This needs to be stored in local storage and attached with further requests 
      this.logInObserver
    )
  }
}
