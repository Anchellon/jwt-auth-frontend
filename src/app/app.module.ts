import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SignupReactiveComponent } from './signup-reactive/signup-reactive.component';
import { HomeComponent } from './home/home.component';
import { HomeGuard } from './home/home.guard'
import { BackGuard } from './home/back.guard';
import { WelcomeComponent } from './welcome/welcome.component'
import { IsNotAuthenticatedGuard} from './data/is-not-authenticated.guard'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignUpFormComponent,
    LoginFormComponent,
    SignupReactiveComponent,
    
    HomeComponent,
    
    WelcomeComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path:'home',canActivate:[HomeGuard],canDeactivate:[BackGuard],component:HomeComponent},
      {path :'signup-reactive',canActivate:[IsNotAuthenticatedGuard],component:SignupReactiveComponent},
      {path:'signup',canActivate:[IsNotAuthenticatedGuard], component:SignUpFormComponent},
      {path:'login',canActivate:[IsNotAuthenticatedGuard],component:LoginFormComponent} ,
      {path:"welcome",component:WelcomeComponent},
      
    ]

    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
