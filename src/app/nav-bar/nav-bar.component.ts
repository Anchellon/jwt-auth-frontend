import { Component, OnInit } from '@angular/core';
import { AuthService } from '../data/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }
  logInStatus:boolean
  ngOnInit(): void {
    console.log("in navbar")

    this.authService.isLoggedIn().subscribe(
      val => {
        console.log("val " + val)
        this.logInStatus = val
        console.log("loginstatus " + this.logInStatus)
      }
    )
    console.log(this.logInStatus)

  }

  onLogOut():void{
    console.log("the val " + this.logInStatus)
    this.authService.logout()
    console.log("waiting")
    this.router.navigate(["login"])
    console.log("help?")
  }


}


