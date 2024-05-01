import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayViewComponent } from './holiday-view.component';


import { TestingModModule } from 'src/app/testing-mod/testing-mod.module';
import { HolidayService } from 'src/app/services/holiday.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

describe('HolidayViewComponent', () => {
  let component: HolidayViewComponent;
  let fixture: ComponentFixture<HolidayViewComponent>;
  let holidayServiceObj;
  const testObj = new TestingModModule();
  let servArr = ['getCities',
    'signOut',
    'userDate$',
    'getHolidays',
    'monthViewUpdateNotifier$',
    'sendUserSelectedDateId'
  ];

  holidayServiceObj = jasmine.createSpyObj('HolidayService', servArr);
  holidayServiceObj.userDate$ = of();
  let monthViewUpdate = new Subject<any>();

  holidayServiceObj.monthViewUpdateNotifier$ = monthViewUpdate.asObservable();
  const weekHeader = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HolidayViewComponent],
      imports: [
        RouterTestingModule,
        TestingModModule,
      ],
      providers: [
        { provide: HolidayService, useValue: holidayServiceObj },

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const setDate = new Date('2020/02/14');
    jasmine.clock().mockDate(setDate);
    fixture = TestBed.createComponent(HolidayViewComponent);
    component = fixture.componentInstance;
    component.year = 2020;
    component.monthIndex = 1;
    fixture.detectChanges();
    holidayServiceObj.getHolidays.calls.reset();
    holidayServiceObj.sendUserSelectedDateId.calls.reset();
  });

  describe('TS file', () => {


    it('Test1 ng OnInit should send current date(DD/MM/YYYY) using sendUserSelectedDateId service function', () => {
      component.ngOnInit();
      expect(holidayServiceObj.sendUserSelectedDateId).toHaveBeenCalledWith('14/02/2020');
    });

    it('Test2 ng OnInit should send current date(DD/MM/YYYY) using sendUserSelectedDateId service function', () => {
      const setDate = new Date('2019/05/18');
      jasmine.clock().mockDate(setDate);
      fixture.detectChanges();
      component.ngOnInit();
      expect(holidayServiceObj.sendUserSelectedDateId).toHaveBeenCalledWith('18/05/2019');
    });

    it('monthViewUpdateNotifier$ should call monthGenerator when monthViewUpdateNotifier updates', () => {

      holidayServiceObj.getHolidays.and.returnValue(of([]));
      component.year = 2020;
      component.monthIndex = 2;
      const s = spyOn(component, 'monthGenerator');
      holidayServiceObj.monthViewUpdateNotifier$.subscribe(res => {

      });
      monthViewUpdate.next();
      expect(s).toHaveBeenCalled();

    });

    it('Test1 ng OnInit should assign current date date(DD/MM/YYYY) to selectedDate', () => {
      component.ngOnInit();
      expect(component.selectedDate).toBe('14/02/2020');
    });

    it('Test2 ng OnInit should assign current date date(DD/MM/YYYY) to selectedDate', () => {
      const setDate = new Date('2019/01/14');
      jasmine.clock().mockDate(setDate);
      component.ngOnInit();
      expect(component.selectedDate).toBe('14/01/2019');
    });

    it('Test1 monthGenerator should generate Objects', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      component.year = 2020;
      component.monthIndex = 1;
      component.monthGenerator();
      expect(component.dateObj).toEqual(testObj.convertModel(1));
    });

    it('Test2 monthGenerator should generate Objects', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      component.year = 2019;
      component.monthIndex = 11;
      component.monthGenerator();
      expect(component.dateObj).toEqual(testObj.convertModel(2));
    });

    it('Test3 monthGenerator should generate Objects', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      component.year = 2020;
      component.monthIndex = 2;
      component.monthGenerator();
      expect(component.dateObj).toEqual(testObj.convertModel(3));
    });

    it('monthGenerator should call holidayInitializer after generating objects', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      component.year = 2020;
      component.monthIndex = 2;
      let spy = spyOn(component, 'holidayInitializer');
      component.monthGenerator();
      expect(spy).toHaveBeenCalled();
    });

    it('holidayInitializer should use getHolidays() in HolidayService to get holiday list', () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));
      component.city = 'ccc';
      component.monthIndex = 2;
      component.year = 2020;
      component.holidayInitializer();
      expect(holidayServiceObj.getHolidays).toHaveBeenCalledWith('ccc', 2, 2020);
    });

    it('Test1 getHolidays() => response data should be converted and intialized to responseDateObjs', async () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));
      component.city = 'ccc';
      component.monthIndex = 2;
      component.year = 2020;
      component.holidayInitializer();
      await holidayServiceObj.getHolidays(component.city, component.monthIndex, component.year).subscribe(res => {
      });
      testObj.resOb1.forEach(element => {
        expect(component.responseDateObjs.get(element.date)).toEqual(element);
      });
    });

    it('Test2 getHolidays() => response data should be converted and intialized to responseDateObjs', (async () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb2));
      component.city = 'ccc';
      component.monthIndex = 12;
      component.year = 2019;
      component.holidayInitializer();
      await holidayServiceObj.getHolidays(component.city, component.monthIndex, component.year).subscribe(res => {
        testObj.resOb2.forEach(element => {
          expect(component.responseDateObjs.get(element.date)).toEqual(element);
        });
      });
    }));

    it('sendSelectedDate() should call sendUserSelectedDateId', () => {
      let obj = '20/05/2020';
      component.sendSelectedDate(obj);
      expect(component.selectedDate).toBe(obj);
      expect(holidayServiceObj.sendUserSelectedDateId).toHaveBeenCalledWith(obj);
      obj = '27/05/2020';
      component.sendSelectedDate(obj);
      expect(component.selectedDate).toBe(obj);
      expect(holidayServiceObj.sendUserSelectedDateId).toHaveBeenCalledWith(obj);

    });


  });
  describe('HTML file', () => {

    it('calendar-header should contain header', () => {
      const calendarHeader = fixture.debugElement.query(By.css('.calendar-header'));
      const nativeWeek = calendarHeader.nativeElement.querySelectorAll('.week');
      expect(nativeWeek.length).toBe(7);
      let i = 0;
      for (let element of weekHeader) {
        expect(nativeWeek[i++].textContent.trim()).toBe(element);
      }
    });

    it('calendar-header should contain css class', () => {
      const calendarHeader = fixture.debugElement.query(By.css('.calendar-header'));
      let nativeWeek = calendarHeader.nativeElement.querySelectorAll('.week.mat-h3');
      expect(nativeWeek.length).toBe(7);
      let i = 0;
      for (let element of weekHeader) {
        expect(nativeWeek[i++].textContent.trim()).toBe(element);
      }
    });

    it('calendar-body should contain 6 rows', () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));

      component.monthGenerator();
      fixture.detectChanges();
      const calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
      const nativeRow = calendarBody.nativeElement.querySelectorAll('.tr-row');
      expect(nativeRow.length).toBe(6);
    });

    it('calendar-body should contain 42 .td-month', () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));
      component.monthGenerator();
      fixture.detectChanges();
      const calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
      const nativeRow = calendarBody.nativeElement.querySelectorAll('.td-month');
      expect(nativeRow.length).toBe(42);
    });

    it('Testing number of .tdEnabled css class', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      for (let monthCount = 1; monthCount < 13; monthCount++) {
        const setDate = new Date(`2020/${monthCount}/14`);
        jasmine.clock().mockDate(setDate);
        component.monthIndex = monthCount - 1;
        component.year = 2020;
        component.ngOnInit();
        component.monthGenerator();
        fixture.detectChanges();
        let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
        let tdEnabled = calendarBody.nativeElement.querySelectorAll('.tdEnabled');
        expect(tdEnabled.length).toBe(new Date(2020, monthCount, 0).getDate());
      }
    });

    it('Testing number of .tdDisabled css class', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      for (let monthCount = 1; monthCount < 13; monthCount++) {
        const setDate = new Date(`2020/${monthCount}/14`);
        jasmine.clock().mockDate(setDate);
        component.monthIndex = monthCount - 1;
        component.year = 2020;
        component.ngOnInit();
        component.monthGenerator();
        fixture.detectChanges();
        let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
        let tdEnabled = calendarBody.nativeElement.querySelectorAll('.tdDisabled');
        expect(tdEnabled.length).toBe(42 - (new Date(2020, monthCount, 0).getDate()));
      }
    });

    it('Test1 default date element to be selected', () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));
      component.ngOnInit();
      component.monthGenerator();
      fixture.detectChanges();
      const calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
      const selectedDateElement = calendarBody.queryAll(By.css('.tdEnabled.tdSelected'));
      expect(selectedDateElement.length).toBe(1);
      let elementDate = selectedDateElement[0].query(By.css('.mat-h1'));
      expect(elementDate.nativeElement.textContent.trim()).toBe('14');
    });

    it('Test2 default date element to be selected', () => {
      const setDate = new Date('2019/12/30');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      component.city = 'c';
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb2));
      component.ngOnInit();
      component.monthGenerator();

      fixture.detectChanges();
      const calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
      const selectedDateElement = calendarBody.queryAll(By.css('.tdEnabled.tdSelected'));
      expect(selectedDateElement.length).toBe(1);
      let elementDate = selectedDateElement[0].query(By.css('.mat-h1'));
      expect(elementDate.nativeElement.textContent.trim()).toBe('30');
    });

    it('Test1 onClick date element=> selected date element should have .tdSelected css class ', () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));
      component.year = 2020;
      component.monthIndex = 1;
      component.monthGenerator();
      fixture.detectChanges();
      let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
      let tdEnabled = calendarBody.queryAll(By.css('.tdEnabled'));
      expect(tdEnabled.length).toBe(29);
      for (let index = 0; index < 29; index++) {
        tdEnabled[index].nativeElement.click();
        fixture.detectChanges();
        let selectedDateElement = calendarBody.queryAll(By.css('.tdEnabled.tdSelected'));
        expect(selectedDateElement.length).toBe(1);
        let elementDate = selectedDateElement[0].query(By.css('.mat-h1'));
        let resultNum = (index + 1) < 10 ? 0 + (index + 1).toString() : (index + 1).toString();
        expect(elementDate.nativeElement.textContent.trim()).toBe(resultNum);
      }
    });

    it('Test1 onClick .tdEnabled element=> should call sendSelectedDate function with DateInMonth object', () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));
      component.year = 2020;
      component.monthIndex = 1;
      component.monthGenerator();
      fixture.detectChanges();
      let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
      let tdEnabled = calendarBody.queryAll(By.css('.tdEnabled'));
      expect(tdEnabled.length).toBe(29);
      let spyBtn = spyOn(component, 'sendSelectedDate');
      for (let index = 0; index < 29; index++) {
        spyBtn.calls.reset();
        tdEnabled[index].nativeElement.click();
        let resultNum = (index + 1) < 10 ? 0 + (index + 1).toString() : (index + 1).toString();
        let mockDIMObj = `${resultNum}/02/2020`;
        expect(spyBtn).toHaveBeenCalledWith(mockDIMObj);
      }
    });

    it('Test2 onClick .tdEnabled element=> should call sendSelectedDate function with DateInMonth object', () => {
      holidayServiceObj.getHolidays.and.returnValue(of(testObj.resOb1));
      component.year = 2020;
      component.monthIndex = 0;
      component.monthGenerator();
      fixture.detectChanges();
      let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
      let tdEnabled = calendarBody.queryAll(By.css('.tdEnabled'));
      expect(tdEnabled.length).toBe(31);
      let spyBtn = spyOn(component, 'sendSelectedDate');
      for (let index = 0; index < 31; index++) {
        spyBtn.calls.reset();
        tdEnabled[index].nativeElement.click();
        let resultNum = (index + 1) < 10 ? 0 + (index + 1).toString() : (index + 1).toString();
        let mockDIMObj = `${resultNum}/01/2020`;
        expect(spyBtn).toHaveBeenCalledWith(mockDIMObj);
      }
    });

    it('Test1 onClick .tdDisabled element=> should not call sendSelectedDate function', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      component.year = 2020;
      component.monthIndex = 1;
      component.monthGenerator();
      fixture.detectChanges();
      let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
      let tdDisabled = calendarBody.queryAll(By.css('.tdDisabled'));
      expect(tdDisabled.length).toBe(13);
      let spyBtn = spyOn(component, 'sendSelectedDate');
      for (let index = 0; index < 13; index++) {
        spyBtn.calls.reset();
        tdDisabled[index].nativeElement.click();
        expect(spyBtn).not.toHaveBeenCalled();
      }
    });

    it('Test2 onClick .tdDisabled element=> should not call sendSelectedDate function', () => {
      holidayServiceObj.getHolidays.and.returnValue(of([]));
      component.year = 2020;
      component.monthIndex = 0;
      component.monthGenerator();
      fixture.detectChanges();
      let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
      let tdDisabled = calendarBody.queryAll(By.css('.tdDisabled'));
      expect(tdDisabled.length).toBe(11);
      let spyBtn = spyOn(component, 'sendSelectedDate');
      for (let index = 0; index < 11; index++) {
        spyBtn.calls.reset();
        tdDisabled[index].nativeElement.click();
        expect(spyBtn).not.toHaveBeenCalled();
      }
    });

    it('Display date', () => {
      for (let mockObjs of testObj.displayDate) {
        holidayServiceObj.getHolidays.and.returnValue(of([]));
        component.monthIndex = mockObjs.month - 1;
        component.year = mockObjs.year;
        component.monthGenerator();
        fixture.detectChanges();
        let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
        let tdMonth = calendarBody.queryAll(By.css('.td-month'));
        for (let index = 0; index < mockObjs.endLoop1; index++) {
          let matH1Val = tdMonth[index].nativeElement.querySelector('.mat-h1');
          let resultNum = (mockObjs.beginDate + index) < 10 ? 0 + (mockObjs.beginDate + index).toString() :
            (mockObjs.beginDate + index).toString();
          expect(matH1Val.textContent.trim()).toBe(resultNum);
        }

        for (let index = mockObjs.endLoop1; index < mockObjs.endLoop2; index++) {
          let matH1Val = tdMonth[index].nativeElement.querySelector('.mat-h1');
          let resultNum = (index + 1 - mockObjs.endLoop1) < 10 ? 0 + (index + 1 - mockObjs.endLoop1).toString() :
            (index + 1 - mockObjs.endLoop1).toString();
          expect(matH1Val.textContent.trim()).toBe(resultNum);
        }

        for (let index = mockObjs.endLoop2, supportIndex = 1; index < 42; index++ , supportIndex++) {
          let matH1Val = tdMonth[index].nativeElement.querySelector('.mat-h1');
          let resultNum = (supportIndex) < 10 ? 0 + (supportIndex).toString() :
            (supportIndex).toString();
          expect(matH1Val.textContent.trim()).toBe(resultNum);
        }
      }
    });


    it('Display Holiday names in calendar', () => {
      for (let mockObjs of testObj.displayDate) {
        holidayServiceObj.getHolidays.and.returnValue(of(mockObjs.resObj));
        const setDate = new Date(`${mockObjs.year}/${mockObjs.month}/12`);
        jasmine.clock().mockDate(setDate);
        component.monthIndex = mockObjs.month - 1;
        component.year = mockObjs.year;
        component.monthGenerator();
        fixture.detectChanges();
        let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
        let tdEnabled = calendarBody.queryAll(By.css('.tdEnabled'));
        let supportIndex = 0;
        for (let resData of mockObjs.resObj) {
          let index = parseInt(resData.date.split('/')[0]);
          let holdaiayName = tdEnabled[index - 1].nativeElement.querySelector('.mat-h3');
          expect(holdaiayName.textContent.trim()).toBe(mockObjs.resObj[supportIndex++].holidayName);
        }
      }
    });


    it('HolidayName=>Testing holidayBoxSelected css class and holidayBoxUnSelected css class', () => {
      for (let mockObjs of testObj.displayDate) {
        holidayServiceObj.getHolidays.and.returnValue(of(mockObjs.resObj));
        const setDate = new Date(`${mockObjs.year}/${mockObjs.month}/12`);
        jasmine.clock().mockDate(setDate);
        component.monthIndex = mockObjs.month - 1;
        component.year = mockObjs.year;
        component.monthGenerator();
        fixture.detectChanges();
        let calendarBody = fixture.debugElement.query(By.css('.calendar-body'));
        let tdEnabled = calendarBody.queryAll(By.css('.tdEnabled'));
        for (let resData of mockObjs.resObj) {
          let index = parseInt(resData.date.split('/')[0]);
          let holdaiayNameCss1 = tdEnabled[index - 1].query(By.css('.mat-h3.holidayBoxSelected'));
          expect(holdaiayNameCss1).toBeFalsy();
          holdaiayNameCss1 = tdEnabled[index - 1].query(By.css('.mat-h3.holidayBoxUnSelected'));
          expect(holdaiayNameCss1).toBeTruthy();
          tdEnabled[index - 1].nativeElement.click();
          fixture.detectChanges();
          holdaiayNameCss1 = tdEnabled[index - 1].query(By.css('.mat-h3.holidayBoxUnSelected'));
          expect(holdaiayNameCss1).toBeFalsy();
          holdaiayNameCss1 = tdEnabled[index - 1].query(By.css('.mat-h3.holidayBoxSelected'));
          expect(holdaiayNameCss1).toBeTruthy();
        }
      }
    });

  });
});

@Component({
  template: `<app-holiday-view [city]='city' [monthIndex]='monthIndex' [year]='year'>
  </app-holiday-view>`
})
export class TestHostComponent {
  @ViewChild(HolidayViewComponent) vw;
  city = 'ffffffffff';
  year = 2019;
  monthIndex = 0;

}
describe('TestHost holidayView', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HolidayViewComponent, TestHostComponent],
      imports: [
        TestingModModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const setDate = new Date('2019/02/14');
    jasmine.clock().mockDate(setDate);
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when city|year|month change=> holiday view component should call monthGenerator', () => {
    let spyObj = spyOn(component.vw, 'monthGenerator');
    component.city = 'ccssds';
    fixture.detectChanges();
    expect(spyObj).toHaveBeenCalled();

    spyObj.calls.reset();
    component.year = 2025;
    fixture.detectChanges();
    expect(spyObj).toHaveBeenCalled();

    spyObj.calls.reset();
    component.monthIndex = 10;
    fixture.detectChanges();
    expect(spyObj).toHaveBeenCalled();
  });

});
