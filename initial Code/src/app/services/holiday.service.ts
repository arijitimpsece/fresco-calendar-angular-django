import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  // for auth guard
  private authKey = false;


  // Use userDateSelection to send date
  private userDateSelection = new Subject<any>();

  // Use monthViewUpdate to notify updates
  private monthViewUpdate = new Subject<any>();

  // Use userDate$ to get the updated date
  userDate$ = this.userDateSelection.asObservable();

  // Use monthViewUpdateNotifier$ to get updates
  monthViewUpdateNotifier$ = this.monthViewUpdate.asObservable();


  constructor(private http: HttpClient, private route: Router) { }


  // **************** Component Interaction **************** //

  // to send selected date from holiday-view component to holiday-editor component
  sendUserSelectedDateId(date) {

  }

  // to notify holiday-view component.Use monthViewUpdate 
  monthComponentNotify() {

  }

  // **************** Authentication **************** //

  
  /**
   * Request using POST method and send JSON object eg: {"admin_email":"test@test.com","password":"test123"}
   * Return Observable
   * Use the URL 'api/admin/login/'
   */
  signIn(username: string, password: string): Observable<any> {
    return null;
  }

  /**
   * Change authKey.
   * Navigate to signIn page
   */
  signOut() {


  }

  /**
   * Return true if user credentials are valid and signIn is done
   * or return false if user credentials are invalid
   */
  authValidator(): boolean {
    
    return null;
  }


  // **************** Dashboard **************** //

  /**
   * Request using GET method and return Observable
   * Use the URL 'api/cities/'
   */
  getCities(): Observable<any> {

    return null;
  }

  // **************** Holiday View **************** //

  /**
   * Request using POST method and send JSON object eg: {city_name:'cityA',month:1}
   * Return Observable
   * Use the URL 'api/monthly/'
   */
  getHolidays(city: string, monthIndex: number, year: number): Observable<any> {

    return null;
  }


  // **************** Holiday Editor **************** //

  /**
   * Request using POST method and send JSON object eg: {date:'02/05/2020',city_name:'cityA'}
   * Return Observable
   * Use the URL 'api/daily/'
   */
  getSelectedHolidayInfo(date: string, city: string): Observable<any> {
   
    return null;
  }

  /**
   * Request using POST method and send JSON object eg: {date:'2020-05-25',city_name:'cityA',holidayName:'new Holiday'}
   * Return Observable
   * Use the URL 'api/create/'
   */
  addHoliday(date: string, city: string, holidayName: string): Observable<any> {
   
    return null;
  }

  /**
   * Request using PUT method and send JSON object eg: {date:'20/05/2020',city_name:'cityA',holidayName:'new Holiday'}
   * Return Observable
   * Use the URL 'api/updateholidayinfo/:id/'.:id -> holiday id
   */
  updateHoliday(id: any, date: string, city: string, holidayName: string): Observable<any> {
    
    return null;
  }


  /**
   * Request using DELETE method
   * Return Observable
   * Use the URL 'api/deleteholidayinfo/:id/'. :id -> holiday id
   */
  removeHoliday(id: any): Observable<any> {
    return null;
  }

  // **************** Upload **************** //

  /**
   * Request using POST method and send FormData with 'file' as name
   * Return Observable
   * Use the URL 'api/upload/'
   */

  uploadFile(file: File): Observable<any> {
    
    return null;
  }

}
