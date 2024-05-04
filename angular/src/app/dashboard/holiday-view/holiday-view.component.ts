import { Component, OnInit, SimpleChanges, Input, OnChanges } from "@angular/core";
import { DateInMonth } from "../../DateInMonth";
import { HolidayService } from "src/app/services/holiday.service";
import { Subject, Subscription } from "rxjs";
import { formatDate } from "@angular/common";

interface Day {
    date: number;
    isCurrentMonth: boolean;
    isSelected: boolean;
    holidayName?: string;
}
@Component({
    selector: "app-holiday-view",
    templateUrl: "./holiday-view.component.html",
    styleUrls: ["./holiday-view.component.css"],
})
export class HolidayViewComponent implements OnInit, OnChanges {
    // get the year from dashboard
    @Input() year;
    // get the monthIndex from dashboard
    @Input() monthIndex;
    // get the city from dashboard
    @Input() city;

    weekHeader = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // assign user selected date to selectedDate
    selectedDate: any;

    // use dateObj to store DateInMonth objects
    dateObj: Array<Array<DateInMonth>> = Array();

    /**
     * Fetch holiday list and insert into responseDateObjs
     */
    responseDateObjs: Map<any, any> = new Map();

    constructor(private holidayServiceObj: HolidayService) {
        // let monthViewUpdate = new Subject<any>();
        // holidayServiceObj.monthViewUpdateNotifier$ = monthViewUpdate.asObservable();
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
        
        this.holidayServiceObj.monthViewUpdateNotifier$.subscribe(() => {
            this.monthGenerator();
        });

        const currentDate = new Date();
        this.selectedDate = formatDate(currentDate, 'dd/MM/yyyy', 'en');
        // this.selectedDate = currentDate;
        this.holidayServiceObj.sendUserSelectedDateId(this.selectedDate);
    }
    
    /**
     *  Generate the data for the 42 cells in the table
     *  Property "enabled" to be true for the current month
     *  After generating fetch holiday list.
     */
    monthGenerator() {
        this.dateObj = Array(); 
        const firstDayOfMonth = new Date(this.year, this.monthIndex, 1);
        const lastDayOfMonth = new Date(this.year, this.monthIndex + 1, 0);
        const firstDayOfPrevMonth = new Date(this.year, this.monthIndex, 0);
        const lastDayOfPrevMonth = new Date(this.year, this.monthIndex, 0);
        const firstDayOfNextMonth = new Date(this.year, this.monthIndex + 1, 1);

        const totalDatesNeeded = 42;

        const datesArray: DateInMonth[] = [];

        
        for (let i = firstDayOfMonth.getDay()-1; i >= 0; i--) {
            const date = new Date(
                firstDayOfPrevMonth.getFullYear(),
                firstDayOfPrevMonth.getMonth(),
                lastDayOfPrevMonth.getDate() - i
            );
            const dateObj = new DateInMonth();
            dateObj.date = formatDate(date, 'dd/MM/yyyy', 'en');
            // dateObj.date = date.toLocaleDateString();
            dateObj.enabled = false;
            datesArray.push(dateObj);
        }

        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const date = new Date(this.year, this.monthIndex, i);
            const dateObj = new DateInMonth();
            dateObj.date = formatDate(date, 'dd/MM/yyyy', 'en');
            dateObj.date = date.toLocaleDateString();
            dateObj.enabled = true;
            datesArray.push(dateObj);
        }

        for (let i = 1; datesArray.length < totalDatesNeeded; i++) {
            const date = new Date(firstDayOfNextMonth.getFullYear(), firstDayOfNextMonth.getMonth(), i);
            const dateObj = new DateInMonth();
            dateObj.date = formatDate(date, 'dd/MM/yyyy', 'en');
            // dateObj.date = date.toLocaleDateString();
            dateObj.enabled = false;
            datesArray.push(dateObj);
        }
        
        for (let i = 0; i < totalDatesNeeded; i += 7) {
            this.dateObj.push(datesArray.slice(i, i + 7));
        }
        this.holidayInitializer();
    }

    /**
     * Fetch holiday list and insert into responseDateObjs
     */
    holidayInitializer() {
        this.holidayServiceObj.getHolidays(this.city, this.monthIndex, this.year).subscribe({
            next: (data)=> {
                // console.log(data);
                // Handle successful data retrieval here
                if (Object.keys(data).length != 0) {
                    data.forEach((element: any) => {
                        this.responseDateObjs.set(element.date, element);
                    });
                }
            },
            error: (error)=> {
                // Handle errors here
                // console.error(error);
            }
        });        
    }

    /**
     *  Assign user selected date to selectedDate
     *  Send the selected date to holiday editor
     */
    sendSelectedDate(userSelectedDate) {
        this.selectedDate = userSelectedDate;
        this.holidayServiceObj.sendUserSelectedDateId(this.selectedDate);
    }
}
