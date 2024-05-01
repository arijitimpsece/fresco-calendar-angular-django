import { TestBed } from '@angular/core/testing';

import { HolidayService } from './holiday.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Location } from '@angular/common';
import { TestingModModule } from '../testing-mod/testing-mod.module';
import { Router } from '@angular/router';

describe('HolidayService', () => {
  let service: HolidayService;
  let location: Location;
  let httpTestingController: HttpTestingController;
  let tObj = new TestingModModule();
  let route: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AuthenticationComponent },
          { path: 'dashboard', component: DashboardComponent }]),
      ]
    });
    route = TestBed.inject(Router);
    location = TestBed.inject(Location);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HolidayService);
  });

  it('signOut should navigate to SignIn page', async () => {
    await route.navigateByUrl('/dashboard');
    await service.signOut();
    expect(route.url).toBe('/');
  });

  it('Test1 authValidator to return false', () => {
    expect(service.authValidator()).toBeFalsy();
  });

  it('Test2 authValidator to return true', () => {

    service.signIn('test@tttttcccccs.com', 'ttttttcccccs').subscribe();
    let req = httpTestingController.expectOne('api/admin/login/');
    req.flush({ status: 1 });
    expect(service.authValidator()).toBeTruthy();
    httpTestingController.verify();

  });

  it('Test3 authValidator to return false', () => {

    service.signIn('test@tttttcccccs.com', 'ttttttcccccs').subscribe();
    let req = httpTestingController.expectOne('api/admin/login/');
    req.flush({ status: 0 });
    expect(service.authValidator()).toBeFalsy();
    httpTestingController.verify();

  });

  it('Test4 authValidator to return false after calling signOut', () => {

    service.signIn('test@tttttcccccs.com', 'ttttttcccccs').subscribe();
    let req = httpTestingController.expectOne('api/admin/login/');
    req.flush({ status: 1 });
    expect(service.authValidator()).toBeTruthy();
    service.signOut();
    expect(service.authValidator()).toBeFalsy();
    httpTestingController.verify();
  });

  describe('http', () => {

    afterEach(() => {
      httpTestingController.verify();
    });

    it('Test signIn should use post method and should return Observable', () => {
      service.signIn(tObj.signInReq1.admin_email, tObj.signInReq1.password).subscribe();
      let req = httpTestingController.expectOne('api/admin/login/');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(tObj.signInReq1);

      service.signIn(tObj.signInReq2.admin_email, tObj.signInReq2.password).subscribe();
      req = httpTestingController.expectOne('api/admin/login/');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(tObj.signInReq2);

    });

    it('Test getCities should use Get method and should return Observable', () => {
      service.getCities().subscribe();
      let req = httpTestingController.expectOne('api/cities/');
      expect(req.request.method).toBe('GET');
    });

    it('Test getHolidays should use post method and should return Observable', () => {
      service.getHolidays(tObj.getHolidayReq1.city_name, tObj.getHolidayReq1.month - 1, tObj.getHolidayReq1.year).subscribe();
      let req = httpTestingController.expectOne('api/monthly/');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(tObj.getHolidayReq1);

      service.getHolidays(tObj.getHolidayReq2.city_name, tObj.getHolidayReq2.month - 1, tObj.getHolidayReq2.year).subscribe();
      req = httpTestingController.expectOne('api/monthly/');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(tObj.getHolidayReq2);

    });

    it('Test getHolidays should use post method and should return Observable', () => {
      service.getSelectedHolidayInfo(tObj.getSelectedHolidayInfoReq1.date, tObj.getSelectedHolidayInfoReq1.city_name).subscribe();
      let req = httpTestingController.expectOne('api/daily/');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(tObj.getSelectedHolidayInfoReq1);

      service.getSelectedHolidayInfo(tObj.getSelectedHolidayInfoReq2.date, tObj.getSelectedHolidayInfoReq2.city_name).subscribe();
      req = httpTestingController.expectOne('api/daily/');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(tObj.getSelectedHolidayInfoReq2);

    });

    it('Test addHoliday should use post method and should return Observable', () => {
      service.addHoliday(tObj.addHolidayReq1Date, tObj.addHolidayReq1.city_name, tObj.addHolidayReq1.holidayName).subscribe();
      let req = httpTestingController.expectOne('api/create/');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(tObj.addHolidayReq1);

      service.addHoliday(tObj.addHolidayReq2Date, tObj.addHolidayReq2.city_name, tObj.addHolidayReq2.holidayName).subscribe();
      req = httpTestingController.expectOne('api/create/');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(tObj.addHolidayReq2);

    });

    it('Test updateHoliday should use post method and should return Observable', () => {
      service.updateHoliday(tObj.viewEditObj1.id, tObj.viewEditObj1.date, tObj.viewEditObj1.city,
        tObj.viewEditObj1.holidayName).subscribe();
      let req = httpTestingController.expectOne(`api/updateholidayinfo/${tObj.viewEditObj1.id}/`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(tObj.updateReq1);

      service.updateHoliday(tObj.viewEditObj2.id, tObj.viewEditObj2.date, tObj.viewEditObj2.city,
        tObj.viewEditObj2.holidayName).subscribe();
      req = httpTestingController.expectOne(`api/updateholidayinfo/${tObj.viewEditObj2.id}/`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(tObj.updateReq2);

    });

    it('Test removeHoliday should use Get method and should return Observable', () => {
      service.removeHoliday(1).subscribe();
      let req = httpTestingController.expectOne(`api/deleteholidayinfo/1/`);
      expect(req.request.method).toBe('DELETE');

      service.removeHoliday(13333).subscribe();
      req = httpTestingController.expectOne(`api/deleteholidayinfo/13333/`);
      expect(req.request.method).toBe('DELETE');
    });

    it('Test upload file should use Get method and should return Observable', () => {
      let file = new File(['a', 'b'], 'test.csv');
      service.uploadFile(file).subscribe();
      let req = httpTestingController.expectOne(`api/upload/`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body instanceof FormData).toBeTruthy();
      expect(req.request.body.get('file')).toBeTruthy();
    });
  });

  describe('component Interation', () => {

    it('Test1 sendUserSelectedDateId and userDate$ should work', () => {
      let result = '';
      let unSub = service.userDate$.subscribe(res => {
        result = res;
      });
      service.sendUserSelectedDateId('20/05/2020');
      unSub.unsubscribe();
      expect(result).toBe('20/05/2020');
      result = '';
      unSub = service.userDate$.subscribe(res => {
        result = res;
      });
      service.sendUserSelectedDateId('25/05/2020');
      unSub.unsubscribe();
      expect(result).toBe('25/05/2020');

    });

    it('Test1 monthComponentNotify and monthViewUpdateNotifier$ should work', () => {
      let flag = false;
      let unSub = service.monthViewUpdateNotifier$.subscribe(res => {
        flag = true;
      });
      service.monthComponentNotify();
      unSub.unsubscribe();
      expect(flag).toBeTruthy();
    });

  });
});
