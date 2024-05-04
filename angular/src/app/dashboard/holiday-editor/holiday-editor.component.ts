import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday.service';
import { FormGroup, Validators, FormControl,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-holiday-editor',
  templateUrl: './holiday-editor.component.html',
  styleUrls: ['./holiday-editor.component.css']
})
export class HolidayEditorComponent implements OnInit, OnChanges {
  // get the city from dashboard
  @Input() city = '';

  // get the selected date from hoilday view and assigin it to selectedDate
     selectedDate = '';
  // get the respose and assign it to holidayObj
  holidayObj: any = {};

  // Use the editorFlag to display or hide form
  editorFlag = false;

  /**
   * holidayEditor should contain the following Form control
   * 1. holidayName -> should contain only alphabets or spaces, required.
   */
  holidayEditor: FormGroup;

  constructor(private holidayServiceObj: HolidayService,  private fb: FormBuilder) {
      this.holidayEditor = this.fb.group({
      holidayName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
    });
  }
  get holidayName() {
    return this.holidayEditor.get('holidayName');
  }
  /**
   * When city change get Holiday information
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.getSelectedHolidayInfo()
  }

  /**
   * Get user selected date from holiday view component and assign it to selectedDate
   * Call getSelectedHolidayInfo() when user selects date
   */
  ngOnInit(): void {

    this.holidayServiceObj.userDate$.subscribe(selectedDate => {
      this.selectedDate = selectedDate;
      this.getSelectedHolidayInfo()
    });
  };

  /**
   *    ---> getSelectedHolidayInfo()<---
   *
   * Validate selected date with current date.
   *  ->  If selected date is greater then do the following
   *      1. Display editor
   *      2. Get Holiday information and assign it to holidayObj variable.
   *  -> If selected date is lesser then do the following.
   *      1. Hide editor
   *      2. Do not fetch holiday information
   */
  getSelectedHolidayInfo() {
      const currentDate = new Date();
      let arr = this.selectedDate.split('/');
      const formattedDate = arr[2] + '-' + arr[1] + '-' + arr[0];
      const selectedDate = new Date(formattedDate);
      if (selectedDate > currentDate) {
        this.holidayServiceObj.getSelectedHolidayInfo(this.selectedDate, this.city).subscribe(
          (data) => {
            console.log(data)
            if (data) {
              this.holidayEditor.get('holidayName').setValue(data.holidayName);
              this.editorFlag = true;
              this.holidayObj = data;            
            } else {
              this.holidayEditor.reset();
              this.holidayEditor.get('holidayName').setValue(null);
               this.editorFlag = true;
               this.holidayObj = [];            
            }
            
            this.editorFlag = true;
            
          },
          (error) => {
            // Handle errors here
            // console.error(error);
          }
        );
        
      } else {
        this.editorFlag = false;
      }  
  }

  /**
   *    ---> addHoliday()<---
   * Add Holiday
   * After adding holiday implement the following scenario:
   *    -> Notify holiday view component
   *    -> Get Holiday information
   */
  addHoliday() {
      this.holidayServiceObj.addHoliday(this.selectedDate, this.city, this.holidayName.value).subscribe(response => {
        this.holidayServiceObj.monthComponentNotify();
        this.getSelectedHolidayInfo();
      },
      error => {
        console.log('Add fail');
        
        // this.loginError = 'Invalid email or password';
        // Handle login error here
      }
    );
  }

  /**
   *    ---> updateHoliday()<---
   * Update Holiday
   * After updating holiday implement the following scenario:
   *    -> Notify holiday view component
   *    -> Get Holiday information
   */
  updateHoliday() {
    this.holidayServiceObj.updateHoliday(this.holidayObj.id, this.selectedDate, this.city, this.holidayName.value).subscribe(response => {
        this.holidayServiceObj.monthComponentNotify();
        this.getSelectedHolidayInfo();
        this.holidayEditor.reset();
      },
      error => {
        console.log('update fail');
        
        // this.loginError = 'Invalid email or password';
        // Handle login error here
      }
    );
  }

  /**
   *    ---> removeHoliday()<---
   * Remove Holiday
   * After removing holiday implement the following scenario:
   *    -> Notify holiday view component
   *    -> User should be able to add new Holiday
   */
  removeHoliday() {
   this.holidayServiceObj.removeHoliday(this.holidayObj.id).subscribe(data =>{
      this.holidayServiceObj.monthComponentNotify();
      this.holidayObj = {};
      this.holidayEditor.reset();
    })
  }

  isObjectXEmpty(){
    return this.holidayObj.length === 0
  } 
}
