import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { HttpHeaders, HttpClient,  HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
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
    this.userDateSelection.next(date);
    console.log('Selected date:', date);
  }

  // to notify holiday-view component.Use monthViewUpdate 
  monthComponentNotify() {
    this.monthViewUpdate.next();
  }

  // **************** Authentication **************** //

  
  /**
   * Request using POST method and send JSON object eg: {"admin_email":"test@test.com","password":"test123"}
   * Return Observable
   * Use the URL 'api/admin/login/'
   */
  signIn(username: string, password: string): Observable<any> {
    const url = 'api/admin/login/';
    const body = { admin_email: username, password: password };
    localStorage.setItem('isLoggedIn', 'true')
    return this.http.post<any>(url, body);
  }

  /**
   * Change authKey.
   * Navigate to signIn page
   */
  signOut() {
    localStorage.setItem('isLoggedIn', '');
    this.route.navigate(['/']);
    return false;
  }

  /**
   * Return true if user credentials are valid and signIn is done
   * or return false if user credentials are invalid
   */
  authValidator(): boolean {
    if (localStorage.getItem('isLoggedIn') == 'true' ){
        return true;
    } else {
      return false;
    };

  }


  // **************** Dashboard **************** //

  /**
   * Request using GET method and return Observable
   * Use the URL 'api/cities/'
   */
  getCities(): Observable<any> { 
    return this.http.get<any[]>('api/cities/');
  }

  // **************** Holiday View **************** //

  /**
   * Request using POST method and send JSON object eg: {city_name:'cityA',month:1}
   * Return Observable
   * Use the URL 'api/monthly/'
   */
  getHolidays(city: string, monthIndex: number, year: number): Observable<any> {

    return this.http.post<any>('api/monthly/',{city_name: city, month: monthIndex+1, year: year});
  }


  // **************** Holiday Editor **************** //

  /**
   * Request using POST method and send JSON object eg: {date:'02/05/2020',city_name:'cityA'}
   * Return Observable
   * Use the URL 'api/daily/'
   */
  getSelectedHolidayInfo(date: string, city: string): Observable<any> {
    const pref = 'api/daily/';
    const req = new HttpRequest('POST', pref, {date: date, city_name: city});
     return this.http.request(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return event.body;
        }
      })
    );
  }

  /**
   * Request using POST method and send JSON object eg: {date:'2020-05-25',city_name:'cityA',holidayName:'new Holiday'}
   * Return Observable
   * Use the URL 'api/create/'
   */
  addHoliday(date: string, city: string, holidayName: string): Observable<any> {
      const [day, month, year] = date.split('/');

      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;  
      
      const req = new HttpRequest('POST', 'api/create/', {date: formattedDate, city_name: city, holidayName: holidayName });
      return this.http.request(req).pipe(
        map(event => {        
            return { city_name: city, date: formattedDate, holidayName: holidayName };
          // }
        })
    );
  }

  /**
   * Request using PUT method and send JSON object eg: {date:'20/05/2020',city_name:'cityA',holidayName:'new Holiday'}
   * Return Observable
   * Use the URL 'api/updateholidayinfo/:id/'.:id -> holiday id
   */
  updateHoliday(id: any, date: string, city: string, holidayName: string): Observable<any> {
    const pref = 'api/updateholidayinfo/';
    const url = `${pref}${id}/`;
     const req = new HttpRequest('PUT', url, {date: date, city_name: city, holidayName: holidayName});
     return this.http.request(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return event.body;
        }
      })
    );

    // return this.http.put(url,{date: date, city_name: city, holidayName: holidayName});
  }


  // /**
  //  * Request using DELETE method
  //  * Return Observable
  //  * Use the URL 'api/deleteholidayinfo/:id/'. :id -> holiday id
  //  */
  removeHoliday(id: any): Observable<any> {
    const pref = 'api/deleteholidayinfo/';
    const url = `${pref}${id}/`;
     const req = new HttpRequest('DELETE', url);
     return this.http.request(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return event.body;
        }
      })
    );
    
  }

  // // **************** Upload **************** //

  // /**
  //  * Request using POST method and send FormData with 'file' as name
  //  * Return Observable
  //  * Use the URL 'api/upload/'
  //  */

  uploadFile(file: File): Observable<any>{
    const formData = new FormData();
    formData.append('file', file);
    const headers = new HttpHeaders();
    // // Set Content-Type to multipart/form-data
    headers.set('Content-Type', 'multipart/form-data');

     const req = new HttpRequest('POST', 'api/upload/', formData, {
      headers
    });
    

    return this.http.request(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return event.body;
        }
      })
    );
  }

}
