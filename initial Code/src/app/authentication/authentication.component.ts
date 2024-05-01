import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HolidayService } from '../services/holiday.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  hide = false;

  /**
   * signInForm should contain the following Form control
   * 1. userName -> validate email, required.
   * 2. password -> required
   */

  signInForm: FormGroup;

  constructor(private holidayServiceObj: HolidayService, private snackBar: MatSnackBar, private route: Router, ) { }

  ngOnInit() {
  }

  /**
   * On click signIn button should call validate()
   * The validate should use the signIn function in HolidayService
   * If response is {status:1} then navigate to dashboard
   * Otherwise display "Invalid password" using snackbar
   */
  validate() {

  }

}
