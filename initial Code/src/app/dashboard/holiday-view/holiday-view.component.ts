import { Component, OnInit, SimpleChanges, Input, OnChanges } from '@angular/core';
import { DateInMonth } from '../../DateInMonth';
import { HolidayService } from 'src/app/services/holiday.service';

@Component({
  selector: 'app-holiday-view',
  templateUrl: './holiday-view.component.html',
  styleUrls: ['./holiday-view.component.css']
})

export class HolidayViewComponent implements OnInit, OnChanges {

  // get the year from dashboard
  @Input() year;
  // get the monthIndex from dashboard
  @Input() monthIndex;
  // get the city from dashboard
  @Input() city;

  // assign user selected date to selectedDate
  selectedDate: any;

  // use dateObj to store DateInMonth objects
  dateObj: Array<Array<DateInMonth>> = Array();

  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  responseDateObjs: Map<any, any> = new Map();

  constructor(private holidayServiceObj: HolidayService) {

  }

  /**
   * Generate month when year or monthIndex or city change
   */
  ngOnChanges(changes: SimpleChanges): void {
  }

/**
 * ngOnInit
 * If any updates from holiday editor component then generate month
 * Use monthViewUpdateNotifier$ in HolidayService to get updates
 * Assign current date (dd/mm/yyyy) to selectedDate
 * and send the selected date to holiday editor using sendUserSelectedDateId function in HolidayService
 */
  ngOnInit() {
 
  }

  /**
   *  Generate the data for the 42 cells in the table
   *  Property "enabled" to be true for the current month
   *  After generating fetch holiday list.
   */
  monthGenerator() {

  }


  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  holidayInitializer() {
  
  }


  /**
   *  Assign user selected date to selectedDate
   *  Send the selected date to holiday editor
   */
  sendSelectedDate(userSelectedDate) {

  }

}
