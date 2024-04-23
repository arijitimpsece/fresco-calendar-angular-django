import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { HolidayService } from '../services/holiday.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // assign selected city to selectedCity
  selectedCity: string = null;

  // use year to display year
  year;

  // add month names in monthInAlphabets Array
  monthInAlphabets: Array<any> = [ 'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December' ];

  // Use month index to get month in monthInAlphabets
  monthIndex = 0;

  // get cities and assign it to cities
  cities: any[] = [];

  constructor(public dialog: MatDialog, private holidayServiceObj: HolidayService, private route: Router) {

  }

  /**
   * Set the current month index to monthIndex and set current year to year
   * get cities
   */
  ngOnInit() {
    var date = new Date();
    this.year = date.getFullYear();
    this.monthIndex = date.getMonth()
    this.getCities();
  }

  /**
   *  To navigate month
   *  if "flag" is 0 which means that user click left arrow key <-
   *  if "flag" is 1 which means that user click right arrow key ->
   */
  navigationArrowMonth(flag) {
    // console.log(flag);
    // console.log(this.monthIndex)
    if(flag == 0 && this.monthInAlphabets[this.monthIndex]=== 'January'){
      this.monthIndex = 12
      this.year--
    } else if(flag == 1 && this.monthInAlphabets[this.monthIndex]=== 'December'){
      // console.log(this.monthInAlphabets[this.monthIndex])
      // console.log(this.monthIndex)
      this.monthIndex = -1
      this.year++
    }
    flag === 0 ? this.monthIndex-- : this.monthIndex++
    
  }

  /**
   *  To navigate year
   *  if "flag" is 0 which means that user onclick left arrow key <-
   *  if "flag" is 1 which means that user onclick right arrow key ->
   */
  navigationArrowYear(flag) {
    flag === 0 ? this.year-- : this.year++
  }

  /**
   * To disable navigation for month
   * Return true to disable
   * Return false to enable
   */
  monthNavigatorValidation() {
    if(this.monthIndex !== 11){
      return false;
    }else if(new Date().getMonth() === 11 && this.year === new Date().getFullYear()){
      return false;
    }else{
      return true;
    }
  }

  /**
   * To disable navigation for year
   * return true to disable
   * return false to enable
   */
  yearNavigatorValidation() {
  // let setDate = new Date('2019/12/23');
  //     jasmine.clock().mockDate(setDate);
  //     component.monthIndex = 11;
  //     component.year = 2019;
  //     expect(component.yearNavigatorValidation()).toBeFalsy();
   
   if (this.year == new Date().getFullYear() && this.monthIndex > new Date().getMonth()) {
      return true;
    } else if (this.year == new Date().getFullYear() && this.monthIndex > new Date().getMonth()) {
      return true;
    }
    else if (this.year > new Date().getFullYear() ) {
      return true;
    } else if (new Date().getFullYear() == this.year &&  this.monthIndex<new Date().getMonth()) {
      return false;
    }  else {
      return false;
    }
    // if(this.monthIndex !== 11 && this.year < new Date().getFullYear()){
    //   return false
    // } else if(this.monthIndex === 11 && this.monthIndex == new Date().getMonth() && this.year < new Date().getFullYear()){
    //   return false;
    // }else if(this.monthIndex !== 11){
    //     return true
    // }else if(new Date().getMonth() === 11 && this.monthIndex == 11 && this.year >= new Date().getFullYear()){
    //   return true;
    // } else if(new Date().getMonth() === 11 && this.monthIndex == 11 && this.year < new Date().getFullYear()){
    //   return false;  
    // }else if(this.monthIndex == 11 && this.monthIndex< new Date().getMonth() && this.year <= new Date().getFullYear()){
    //   return false;
    // }else{
    //   return true;
    // }
  }

  /**
   * Open Upload Dialog component and width as 500px
   * After dialog close upload the file and update holiday view component using monthComponentNotify() in HolidayService
   */
  uploadDialog() {
    this.holidayServiceObj.addHoliday('14/02/2020','chjsdhjs', 'asdgbio').subscribe(data=>{
    });
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '500px', // Set width of the dialog
      // Optionally you can add more configurations here
    });
    dialogRef.afterClosed().subscribe(result => {
    
      if (result instanceof File) { // Check if result is a File object
        // If upload is successful, call the uploadFile function in the HolidayService
        this.holidayServiceObj.uploadFile(result).subscribe(data=>{
          // this.holidayServiceObj.monthComponentNotify();
        }); // Pass the selected file to the service
      } else {
        console.log('File upload cancelled or no file selected.');
      }
    });
     
    // const formData = new FormData();
    // const fileName = event.target.files[0];
    // console.log(fileName);
    //  this.holidayServiceObj.uploadFile(fileName).subscribe(data =>{
    //   console.log(typeof this.cities)
    // })
  }


  // Get cities list and assign the response value to cities
  getCities() {
    this.holidayServiceObj.getCities().subscribe(data =>{
      this.cities = data;
      console.log(typeof this.cities)
    })
  }

  // signOut
  signOut() {
    // alert(11)
    this.holidayServiceObj.signOut();
  }


}
