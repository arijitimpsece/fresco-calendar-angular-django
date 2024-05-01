import { Component, OnInit, SimpleChanges, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { DateInMonth } from '../../DateInMonth';
import { HolidayService } from 'src/app/services/holiday.service';
import { Subscription } from 'rxjs';
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

weekHeader = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // assign user selected date to selectedDate
  @Output() selectedDate: any;
  monthViewUpdateSubscription: Subscription;
  // use dateObj to store DateInMonth objects
  dateObj: Array<Array<DateInMonth>> = Array();
  // @Output() selectedDate: EventEmitter<string> = new EventEmitter<string>();
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
    this.monthGenerator();
  }

/**
 * ngOnInit
 * If any updates from holiday editor component then generate month
 * Use monthViewUpdateNotifier$ in HolidayService to get updates
 * Assign current date (dd/mm/yyyy) to selectedDate
 * and send the selected date to holiday editor using sendUserSelectedDateId function in HolidayService
 */
  ngOnInit() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${day}/${month}/${year}`;

      this.selectedDate = formattedDate; 


      // Send the selected date to holiday editor using sendUserSelectedDateId function in HolidayService
      this.holidayServiceObj.sendUserSelectedDateId(this.selectedDate);
    // this.holidayInitializer()
    // // this.monthGenerator()
    // this.holidayServiceObj.monthViewUpdateNotifier$.subscribe(() => {
    //   // this.holidayServiceObj.monthViewUpdate.next();
    //   // Perform actions when month view updates
    //   // For example, generate month or update holiday editor UI
    //   this.monthGenerator(); // Your logic here
    // })
    

    // this.monthViewUpdateSubscription = this.holidayServiceObj.monthViewUpdateNotifier$.subscribe(() => {
    //   // If any updates from holiday editor component, generate month
    //   // Your logic to generate month here...

    //   // Assign current date (dd/mm/yyyy) to selectedDate
    //   const currentDate = new Date();
    //   const day = currentDate.getDate();
    //   const month = currentDate.getMonth() + 1;
    //   const year = currentDate.getFullYear();
    //   this.selectedDate = `${day}/${month}/${year}`;

    //   // Send the selected date to holiday editor using sendUserSelectedDateId function in HolidayService
    //   this.holidayServiceObj.sendUserSelectedDateId(this.selectedDate);
    // });
    
  }

  /**
   *  Generate the data for the 42 cells in the table
   *  Property "enabled" to be true for the current month
   *  After generating fetch holiday list.
   */
  monthGenerator() {
    let fullArray = new Array();

    let daysInPrevsMonth = this.daysInMonth((this.monthIndex - 1 == -1) ? 11 : this.monthIndex-1)
    


    for(let j=0;j<1;j++){
      let weekArray = new Array();

    for(let i=daysInPrevsMonth-6;(daysInPrevsMonth - i)>=0;i++){
      let dateInMonth = new DateInMonth();
      // dateInMonth.date = i.toString()
      let index = this.monthIndex - 1 == -1 ? 12 : this.monthIndex
      let month = index < 10 ? `0${index}` : index
      dateInMonth.date = `${i.toString()}/${month}/${this.year}`
      dateInMonth.enabled = false;
      weekArray.push(dateInMonth);
    }
    fullArray.push(weekArray)
  }



  let daysInMonth = this.daysInMonth(this.monthIndex)
    
    let cellPushed = 0;
    let cellDay = 1

    for(let j=1;j<6;j++){
      let weekArray = new Array();

    for(let i=0;i<7;i++){
      let dateInMonth = new DateInMonth();
      let index = this.monthIndex+1
      let month = index < 10 ? `0${index}` : index
      if(cellDay.toString().length<2){
        //dateInMonth.date = `0${cellDay.toString()}`
        dateInMonth.date = `0${cellDay.toString()}/${month}/${this.year}`
      }else{
      dateInMonth.date = `${cellDay.toString()}/${month}/${this.year}`
      }
      dateInMonth.enabled = true;
      
      cellPushed++;
      if(cellPushed > daysInMonth){
        dateInMonth.enabled = false;
      }
      if(cellDay === daysInMonth){
        cellDay = 0;
        if(this.monthIndex == 11){
          this.monthIndex = 0
        }else{
        this.monthIndex++
        } 
      }
      cellDay ++
      weekArray.push(dateInMonth);
    }
    fullArray.push(weekArray)
  }
  this.dateObj = fullArray

  console.log(this.dateObj)
  this.holidayInitializer()


  }
 extractDay(dateString: string): string {
  // console.log(dateString)
    return dateString.split('/')[0];
  }
daysInMonth(monthIndex){
    if(monthIndex + 1 === 4 || monthIndex + 1 === 6 || monthIndex + 1 === 9 || monthIndex + 1 === 11){
      return 30;
    } else if(monthIndex + 1 ===2 ){
      return 29;
    } else{
      return 31
    }
  }
  /**
   * Fetch holiday list and insert into responseDateObjs
   */
  holidayInitializer() {
  this.holidayServiceObj.getHolidays(this.city,this.monthIndex,this.year).subscribe(
      (data) => {
        // console.log(data);
        // Handle successful data retrieval here
        if (Object.keys(data).length != 0){
          data.forEach(element => {
           this.responseDateObjs.set(element.date,element)
           console.log(this.responseDateObjs)
          });
        }
      },
      (error) => {
        // Handle errors here
        // console.error(error);
      }
    );


    // (data) =>{
    //   // for (let key in data) {
    //   //   this.responseDateObjs.push({ date: holiday.date });
    //   //   // console.log(key, data[key]);
    //   //   this.responseDateObjs.set(data[key].date,data[key].holidayName)
    //   // }
    // console.log(data);
    //   if (Object.keys(data).length != 0){
    //     data.forEach(element => {
    //       this.responseDateObjs.set(element.date,element)
    //     });
    //   }
    // })
   
  }



  /**
   *  Assign user selected date to selectedDate
   *  Send the selected date to holiday editor
   */
  sendSelectedDate(userSelectedDate) {
    this.selectedDate = userSelectedDate;
    this.holidayServiceObj.sendUserSelectedDateId(userSelectedDate);
  }
  ngOnDestroy(): void {
    // Unsubscribe from the subscription to avoid memory leaks
    if (this.monthViewUpdateSubscription) {
      this.monthViewUpdateSubscription.unsubscribe();
    }
  }

  isHoliday(day, responseDateObjs): boolean {
    // console.log(responseDateObjs);

    // Your logic to check if the day is a holiday
    // For demonstration, let's assume some days are holidays
    return day === '14/02/2020' ;
  }
}
