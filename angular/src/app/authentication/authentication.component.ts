import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HolidayService } from '../services/holiday.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  hide = false;
  // loginForm: FormGroup;
  loginError: string = '';
  /**
   * signInForm should contain the following Form control
   * 1. userName -> validate email, required.
   * 2. password -> required
   */

  signInForm: FormGroup;

  constructor(private holidayServiceObj: HolidayService,  private fb: FormBuilder,
   private snackBar: MatSnackBar, private route: Router, ) { 
  this.signInForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });}

  get userName() {
    return this.signInForm.get('userName');
  }

  get password() {
    return this.signInForm.get('password');
  }
  ngOnInit() : void{
  }

  /**
   * On click signIn button should call validate()
   * The validate should use the signIn function in HolidayService
   * If response is {status:1} then navigate to dashboard
   * Otherwise display "Invalid password" using snackbar
   */
 

  validate(): void {
    // if (this.signInForm.invalid) {
    //   this.snackBar.open('Invalid password', 'Close');
    //   return;
    // }
 
    this.holidayServiceObj.signIn(this.userName.value, this.password.value).subscribe(
      response => {
        
        if (response && response['status'] == 1) {
          this.holidayServiceObj.authKey= true;
          localStorage.setItem('isLoggedIn', 'true');
           this.route.navigate(['/dashboard']);
           // alert(localStorage.getItem('isLoggedIn'))
           return true;
         }  else {
          console.log(222333)
          this.holidayServiceObj.authKey= false;
          this.snackBar.open('Invalid password', 'Close');
          return false;
         }
        // Handle successful login response here
      },
      error => {
        this.holidayServiceObj.authKey= false;
        console.log('Login failed:');
        this.snackBar.open('Invalid password', 'Close');
        return false;
        // this.loginError = 'Invalid email or password';
        // Handle login error here
      }
    );
  }

}
