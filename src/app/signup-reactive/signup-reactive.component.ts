import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'


@Component({
  selector: 'app-signup-reactive',
  templateUrl: './signup-reactive.component.html',
  styleUrls: ['./signup-reactive.component.css']
})
export class SignupReactiveComponent implements OnInit {

  customerForm:FormGroup
  constructor(private fb:FormBuilder) { }

  private emailValidationMsgs = {
    required:"Please enter an email address",
    email:"Please enter a valid email adress",
  }
  emailMatch(c:AbstractControl):{[key:string]:boolean}|null{
    let email_control = c.get('email')
    let email_ctr_cnf = c.get("confirmEmail")
    if(email_control.value!= email_ctr_cnf.value){
      return {'match':true}
    }
    return null
  }
  private firstNameValidationMessages = {
    required:"Please enter a first name"
  }
  firstNameMessages:string = ""
  setFirstNameMessage(c:AbstractControl):void{
    this.firstNameMessages=""
    if((c.touched ||c.dirty)&& c.errors){
      this.firstNameMessages = Object.keys(c.errors).map(
        key=> this.firstNameValidationMessages[key]).join(" ")
    }
    console.log(this.firstNameMessages)
  }

  private lastNameValidationMessages = {
    required:"Please enter a last name"
  }
  lastNameMessages:string = ""
  setLastNameMessage(c:AbstractControl):void{
    this.lastNameMessages=""
    if((c.touched ||c.dirty)&& c.errors){
      this.lastNameMessages = Object.keys(c.errors).map(
        key=> this.lastNameValidationMessages[key]).join(" ")
    }
    console.log(this.lastNameMessages)
  }

  private emailValidationMessages = {
    required:"Please enter an email address",
    email:"Please enter a valid Email"
  }
  emailMessages:string = ""
  setEmailMessage(c:AbstractControl):void{
    this.emailMessages=""
    if((c.touched ||c.dirty)&& c.errors){
      console.log("imhere")
      this.emailMessages = Object.keys(c.errors).map(
        key=> this.emailValidationMessages[key]).join(" ")
    }
    console.log(this.emailMessages)
  }
  cnfEmailMessages:string = ""
  private CnfEmailValidationMessages = {
    required:"Please confirm your email address"
    
  }
  setCnfEmailMessage(c:AbstractControl):void{
    this.cnfEmailMessages=""
    if((c.touched ||c.dirty)&& c.errors){
      console.log("imhere2")
      
      this.cnfEmailMessages = Object.keys(c.errors).map(
        key=>this.CnfEmailValidationMessages[key]).join(" ")
    }
    
  }
  ngOnInit(): void {
    this.customerForm= this.fb.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      emailField :this.fb.group({
        email:["",[Validators.required,Validators.email]],
        confirmEmail:["",[Validators.required]]},{validators:this.emailMatch}
        ),
      password:["",Validators.required],
      phoneNumber:["",[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      username:["",Validators.required],
    }
    )

    // we'll need a control refference for each control
    // watch the control
    // respond to a change by calling  a funtion passing the form control, it takes the value argument by Default
    // but we dont have to do anything with it. eseentially jjust call a function when anything changes
    // in that function we see set our messages to "" just to clear out any messages
    // then we check our errors collection
    // then map{this operator takes in a function with a param as the entry in the array and its resulting transformation as in what to do with it} 
    // the errors collection to an array of the errors which are then joined by space.
    let first_name_ctrl = this.customerForm.get('firstName')
    let last_name_ctrl = this.customerForm.get('lastName')
    let email_field_ctrl = this.customerForm.get('emailField')
    let email_ctrl = this.customerForm.get('emailField.email')
    let cnfEmail_ctrl = this.customerForm.get('emailField.confirmEmail')
    let phno_ctrl = this.customerForm.get('phoneNumber')

    // now we do something based on the value changes
    first_name_ctrl.valueChanges.subscribe(
      value => this.setFirstNameMessage(first_name_ctrl)
    )

    last_name_ctrl.valueChanges.subscribe(
      value => this.setLastNameMessage(last_name_ctrl)
    )

    email_ctrl.valueChanges.subscribe(
      value => this.setEmailMessage(email_ctrl)
    )
    cnfEmail_ctrl.valueChanges.subscribe(
      value => this.setCnfEmailMessage(cnfEmail_ctrl)
    )

  }

}
