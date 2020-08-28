import { Component, OnInit } from '@angular/core';
import {SignUpData} from 'src/app/data/sign-up-data';
import { SignupService} from 'src/app/data/signup.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  
  signUpData :SignUpData = {
    email:  '',
    password:    '',
    first_name:  "",
    last_name: "",
    phone_number:"",
    username:"",
  };
  constructor(private signUpService : SignupService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    // console.log("form valid",form.valid)
    if(form.valid){
      this.signUpService.postSignUpData(this.signUpData).subscribe(
        result => {
          console.log("success: ", result)
          this.router.navigate(['/login'])
        },
        error => console.log("error: ", error)
        )
      
    }


  }
}
