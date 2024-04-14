import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { HolidayService } from 'src/app/services/holiday.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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

  constructor() {

  }

  /**
   * When city change get Holiday information
   */
  ngOnChanges(changes: SimpleChanges): void {

  }

  /**
   * Get user selected date from holiday view component and assign it to selectedDate
   * Call getSelectedHolidayInfo() when user selects date
   */
  ngOnInit(): void {};

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
  
  }

  /**
   *    ---> addHoliday()<---
   * Add Holiday
   * After adding holiday implement the following scenario:
   *    -> Notify holiday view component
   *    -> Get Holiday information
   */
  addHoliday() {

  }

  /**
   *    ---> updateHoliday()<---
   * Update Holiday
   * After updating holiday implement the following scenario:
   *    -> Notify holiday view component
   *    -> Get Holiday information
   */
  updateHoliday() {

  }

  /**
   *    ---> removeHoliday()<---
   * Remove Holiday
   * After removing holiday implement the following scenario:
   *    -> Notify holiday view component
   *    -> User should be able to add new Holiday
   */
  removeHoliday() {
   
  }

}
