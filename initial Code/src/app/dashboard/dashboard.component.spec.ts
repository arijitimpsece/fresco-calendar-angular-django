import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

import { HolidayViewComponent } from './holiday-view/holiday-view.component';
import { HolidayEditorComponent } from './holiday-editor/holiday-editor.component';

import { TestingModModule } from '../testing-mod/testing-mod.module';
import { MaterialModule } from '../material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HolidayService } from '../services/holiday.service';
import { of } from 'rxjs';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { By } from '@angular/platform-browser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';

describe('DashboardComponent', () => {

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let holidayServiceObj;
  const t = new TestingModModule();
  const dialogObj = jasmine.createSpyObj('MatDialog', ['open']);
  holidayServiceObj = jasmine.createSpyObj('HolidayService', ['getCities', 'signOut', 'userDate$', 'getHolidays',
    'monthViewUpdateNotifier$',
    'sendUserSelectedDateId', 'uploadFile',
    'monthComponentNotify'
  ]);
  holidayServiceObj.userDate$ = of();
  holidayServiceObj.monthViewUpdateNotifier$ = of();
  holidayServiceObj.getCities.and.returnValue(of(t.city1));

  holidayServiceObj.getHolidays.and.returnValue(of([]));
  holidayServiceObj.uploadFile.and.returnValue(of());

  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, HolidayViewComponent, HolidayEditorComponent, UploadDialogComponent],
      imports: [
        TestingModModule,
        RouterTestingModule,
        MaterialModule
      ],
      providers: [
        { provide: HolidayService, useValue: holidayServiceObj },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const setDate = new Date('2019/12/23');
    jasmine.clock().mockDate(setDate);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    fixture.detectChanges();


  });
  describe('Test TS file', () => {
    it('ngOnInit to Initialize monthIndex and year', () => {

      let setDate = new Date('2019/11/23');
      jasmine.clock().mockDate(setDate);
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component.monthIndex).toBe(10);
      expect(component.year).toBe(2019);

      setDate = new Date('2018/10/23');
      jasmine.clock().mockDate(setDate);
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component.monthIndex).toBe(9);
      expect(component.year).toBe(2018);

      setDate = new Date('2020/1/1');
      jasmine.clock().mockDate(setDate);
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component.monthIndex).toBe(0);
      expect(component.year).toBe(2020);

      setDate = new Date('2021/2/1');
      jasmine.clock().mockDate(setDate);
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      expect(component.monthIndex).toBe(1);
      expect(component.year).toBe(2021);

    });

    it('ngOnInit to load cities', () => {

      component.ngOnInit();
      expect(holidayServiceObj.getCities).toHaveBeenCalled();

    });

    it('getCities to get the city list and assign the response to cities', async(() => {

      component.getCities();
      expect(holidayServiceObj.getCities).toHaveBeenCalled();
      holidayServiceObj.getCities().subscribe(res => {

        expect(component.cities).toEqual(t.city1);

      });
      holidayServiceObj.getCities.and.returnValue(of(t.city2));
      component.getCities();

      holidayServiceObj.getCities().subscribe(res => {

        expect(component.cities).toEqual(t.city2);

      });
    }));

    it('Test1 -> navigationArrowMonth arrow ', () => {
      const setDate = new Date('2019/11/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 10;
      component.year = 2019;
      component.navigationArrowMonth(0);
      expect(component.monthIndex).toBe(9);
      expect(component.year).toBe(2019);

      component.navigationArrowMonth(0);
      expect(component.monthIndex).toBe(8);
      expect(component.year).toBe(2019);

      component.navigationArrowMonth(1);
      expect(component.monthIndex).toBe(9);
      expect(component.year).toBe(2019);

      component.navigationArrowMonth(1);
      expect(component.monthIndex).toBe(10);
      expect(component.year).toBe(2019);

    });

    it('Test2 -> navigationArrowMonth arrow ', () => {
      const setDate = new Date('2019/12/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      component.navigationArrowMonth(1);
      expect(component.monthIndex).toBe(0);
      expect(component.year).toBe(2020);

      component.navigationArrowMonth(0);
      expect(component.monthIndex).toBe(11);
      expect(component.year).toBe(2019);

      component.navigationArrowMonth(0);
      expect(component.monthIndex).toBe(10);
      expect(component.year).toBe(2019);

      component.navigationArrowMonth(1);
      component.navigationArrowMonth(1);
      component.navigationArrowMonth(1);

      expect(component.monthIndex).toBe(1);
      expect(component.year).toBe(2020);

    });

    it('Test3 -> navigationArrowMonth arrow ', () => {
      const setDate = new Date('2019/1/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 0;
      component.year = 2019;
      component.navigationArrowMonth(0);
      expect(component.monthIndex).toBe(11);
      expect(component.year).toBe(2018);

      component.navigationArrowMonth(0);
      expect(component.monthIndex).toBe(10);
      expect(component.year).toBe(2018);

      component.navigationArrowMonth(1);
      expect(component.monthIndex).toBe(11);
      expect(component.year).toBe(2018);

      component.navigationArrowMonth(1);
      component.navigationArrowMonth(1);
      component.navigationArrowMonth(1);

      expect(component.monthIndex).toBe(2);
      expect(component.year).toBe(2019);

    });


    it('navigationArrowYear arrow', () => {
      const setDate = new Date('2019/1/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 0;
      component.year = 2019;
      component.navigationArrowYear(0);
      expect(component.year).toBe(2018);

      component.navigationArrowYear(0);
      expect(component.year).toBe(2017);

      component.navigationArrowYear(1);
      expect(component.year).toBe(2018);

      component.navigationArrowYear(1);
      expect(component.year).toBe(2019);

      component.navigationArrowYear(1);
      expect(component.year).toBe(2020);
    });

    it('signOut should use signOut service', () => {
      component.signOut();
      expect(holidayServiceObj.signOut).toHaveBeenCalled();
    });

    it('monthNavigatorValidation should return true', () => {
      let setDate = new Date('2019/11/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      expect(component.monthNavigatorValidation()).toBeTruthy();

      setDate = new Date('2019/5/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      expect(component.monthNavigatorValidation()).toBeTruthy();

      setDate = new Date('2019/12/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2020;
      expect(component.monthNavigatorValidation()).toBeTruthy();
    });


    it('monthNavigatorValidation should return false', () => {
      let setDate = new Date('2019/12/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      expect(component.monthNavigatorValidation()).toBeFalsy();

      component.monthIndex = 5;
      component.year = 2020;
      expect(component.monthNavigatorValidation()).toBeFalsy();

      setDate = new Date('2019/5/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 7;
      component.year = 2019;
      expect(component.monthNavigatorValidation()).toBeFalsy();

      setDate = new Date('2019/12/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 7;
      component.year = 2019;
      expect(component.monthNavigatorValidation()).toBeFalsy();
    });

    it('yearNavigatorValidation should return true', () => {

      let setDate = new Date('2019/11/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      expect(component.yearNavigatorValidation()).toBeTruthy();

      setDate = new Date('2019/10/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      expect(component.yearNavigatorValidation()).toBeTruthy();

      setDate = new Date('2019/12/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2020;
      expect(component.yearNavigatorValidation()).toBeTruthy();

    });


    it('yearNavigatorValidation should return true', () => {

      let setDate = new Date('2019/11/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2018;
      expect(component.yearNavigatorValidation()).toBeFalsy();

      setDate = new Date('2019/10/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 5;
      component.year = 2017;
      expect(component.yearNavigatorValidation()).toBeFalsy();

      setDate = new Date('2019/12/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      expect(component.yearNavigatorValidation()).toBeFalsy();

    });

    it('uploadDialog should open upload dialog', async () => {
      component.uploadDialog();
      const dialog = await rootLoader.getHarness(MatDialogHarness);
      const id = await dialog.getId();
      expect(id).toBeDefined();
      const width = await (await dialog.host()).getCssValue('width');
      expect(width).toBe('500px');
    });

    it('uploadDialog should call uploadFile function in Holiday service when afterClosed response contain File Object', async () => {
      holidayServiceObj.uploadFile.calls.reset();
      let file = new File(['a', 'b'], 'test.csv');
      spyOn(MatDialogRef.prototype, 'afterClosed').and.returnValue(of(file));
      component.uploadDialog();
      const dialog = await rootLoader.getHarness(MatDialogHarness);
      const id = await dialog.getId();
      expect(id).toBeDefined();
      expect(holidayServiceObj.uploadFile).toHaveBeenCalledWith(file);
    });

    it('uploadDialog should not call uploadFile function in Holiday service when afterClosed response does not contain File Object',
      async () => {
        holidayServiceObj.uploadFile.calls.reset();
        spyOn(MatDialogRef.prototype, 'afterClosed').and.returnValue(of(undefined));
        component.uploadDialog();
        const dialog = await rootLoader.getHarness(MatDialogHarness);
        const id = await dialog.getId();
        expect(id).toBeDefined();
        expect(holidayServiceObj.uploadFile).not.toHaveBeenCalled();
      });


    it('After uploading file notify holiday view component using monthComponentNotify', async(() => {
      holidayServiceObj.uploadFile.calls.reset();
      let file = new File(['a', 'b'], 'test.csv');
      spyOn(MatDialogRef.prototype, 'afterClosed').and.returnValue(of(file));
      holidayServiceObj.uploadFile.and.returnValue(of({ status: 1 }));
      component.uploadDialog();
      holidayServiceObj.uploadFile(file).subscribe(res => {
        expect(holidayServiceObj.monthComponentNotify).toHaveBeenCalled();
      });
    }));

  });

  describe('Test HTML', () => {


    it('Sign Out button should call signOut function', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#signOut');
      const spy = spyOn(component, 'signOut');
      btn.click();
      expect(spy).toHaveBeenCalled();
    });

    it('Month navigation, left button should call navigationArrowMonth function', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#leftMonthKey');
      const spy = spyOn(component, 'navigationArrowMonth');
      btn.click();
      expect(spy).toHaveBeenCalledWith(0);
    });

    it('Month navigation, right button should call navigationArrowMonth function', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#rightMonthKey');
      const spy = spyOn(component, 'navigationArrowMonth');
      btn.click();
      expect(spy).toHaveBeenCalledWith(1);
    });


    it('Year navigation, left button should call navigationArrowYear function', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#leftYearKey');
      const spy = spyOn(component, 'navigationArrowYear');
      btn.click();
      expect(spy).toHaveBeenCalledWith(0);
    });

    it('Year navigation, right button should call navigationArrowYear function', () => {

      const btn = fixture.debugElement.nativeElement.querySelector('#rightYearKey');
      const spy = spyOn(component, 'navigationArrowYear');
      btn.click();
      expect(spy).toHaveBeenCalledWith(1);
    });

    it('Year navigation, right button to be disabled', () => {
      let setDate = new Date('2019/11/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      fixture.detectChanges();
      const btn = fixture.debugElement.nativeElement.querySelector('#rightYearKey');
      expect(btn.disabled).toBeTruthy();

      setDate = new Date('2018/05/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 8;
      component.year = 2018;
      fixture.detectChanges();
      expect(btn.disabled).toBeTruthy();

    });

    it('Year navigation, right button to be enabled', () => {
      let setDate = new Date('2019/12/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      fixture.detectChanges();
      const btn = fixture.debugElement.nativeElement.querySelector('#rightYearKey');
      expect(btn.disabled).toBeFalsy();

      setDate = new Date('2020/11/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 8;
      component.year = 2018;
      fixture.detectChanges();
      expect(btn.disabled).toBeFalsy();

    });


    it('Month navigation, right button to be disabled', () => {
      let setDate = new Date('2019/11/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      fixture.detectChanges();
      const btn = fixture.debugElement.nativeElement.querySelector('#rightMonthKey');
      expect(btn.disabled).toBeTruthy();

      setDate = new Date('2018/05/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2018;
      fixture.detectChanges();
      expect(btn.disabled).toBeTruthy();

    });

    it('Month navigation, right button to be enabled', () => {
      let setDate = new Date('2019/12/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      fixture.detectChanges();
      const btn = fixture.debugElement.nativeElement.querySelector('#rightMonthKey');
      expect(btn.disabled).toBeFalsy();

      setDate = new Date('2020/11/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 8;
      component.year = 2018;
      fixture.detectChanges();
      expect(btn.disabled).toBeFalsy();

    });

    it('Month Value should change on button click', () => {
      const setDate = new Date('2019/12/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      fixture.detectChanges();
      const btnRight = fixture.debugElement.nativeElement.querySelector('#rightMonthKey');
      const btnLeft = fixture.debugElement.nativeElement.querySelector('#leftMonthKey');
      const monthValue = fixture.debugElement.nativeElement.querySelector('#monthValue');
      const month = [
        'January',
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
        'December'
      ];
      month.forEach(res => {
        btnRight.click();
        fixture.detectChanges();
        expect(monthValue.innerHTML.trim()).toBe(res);
      });

      component.monthIndex = 0;
      fixture.detectChanges();
      month.reverse().forEach(res => {
        btnLeft.click();
        fixture.detectChanges();
        expect(monthValue.innerHTML.trim()).toBe(res);
      });

    });

    it('year Value should change on button click', () => {
      const setDate = new Date('2019/12/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      fixture.detectChanges();
      const btnRight = fixture.debugElement.nativeElement.querySelector('#rightYearKey');
      const btnLeft = fixture.debugElement.nativeElement.querySelector('#leftuYearKey');
      const yearValue = fixture.debugElement.nativeElement.querySelector('#yearValue');

      expect(yearValue.innerHTML.trim()).toBe('2019');
      btnRight.click();
      fixture.detectChanges();
      expect(yearValue.innerHTML.trim()).toBe('2020');

      btnRight.click();
      fixture.detectChanges();
      expect(yearValue.innerHTML.trim()).toBe('2020');
    });

    it('when navigate month, year value should change on button click', () => {
      const setDate = new Date('2019/12/23');
      jasmine.clock().mockDate(setDate);
      component.monthIndex = 11;
      component.year = 2019;
      fixture.detectChanges();
      const btnRight = fixture.debugElement.nativeElement.querySelector('#rightMonthKey');
      const btnLeft = fixture.debugElement.nativeElement.querySelector('#leftMonthKey');
      const yearValue = fixture.debugElement.nativeElement.querySelector('#yearValue');
      const monthValue = fixture.debugElement.nativeElement.querySelector('#monthValue');

      expect(yearValue.innerHTML.trim()).toBe('2019');

      btnRight.click();
      fixture.detectChanges();
      expect(yearValue.innerHTML.trim()).toBe('2020');

      btnLeft.click();
      fixture.detectChanges();
      expect(yearValue.innerHTML.trim()).toBe('2019');

      component.monthIndex = 0;
      fixture.detectChanges();
      btnLeft.click();
      fixture.detectChanges();
      expect(yearValue.innerHTML.trim()).toBe('2018');
      const mod = [
        [11, '2019', 'January'],
        [11, '2020', 'January'],
        [11, '2020', 'December']
      ];
      mod.forEach((res: any) => {
        component.monthIndex = res[0];
        fixture.detectChanges();
        btnRight.click();
        fixture.detectChanges();
        expect(yearValue.innerHTML.trim()).toBe(res[1]);
        expect(monthValue.innerHTML.trim()).toBe(res[2]);

      });
    });

    it('Test1 Mat-select to display cities', async () => {
      component.cities = t.city1;
      const c = await loader.getHarness(MatSelectHarness);
      await c.open();
      const opts = await c.getOptions();
      expect(opts.length).toBe(t.city1.length);
      for (let index = 0; index < t.city1.length; index++) {
        const b = await opts[index].getText();
        expect(b).toBe(t.city1[index].cityName);
      }
    });

    it('Test2 Mat-select to display cities', async () => {
      component.cities = t.city3;
      const c = await loader.getHarness(MatSelectHarness);
      await c.open();
      const opts = await c.getOptions();
      expect(opts.length).toBe(t.city3.length);
      for (let index = 0; index < t.city3.length; index++) {
        const b = await opts[index].getText();
        expect(b).toBe(t.city3[index].cityName);
      }
    });

    it('Test1 selected city should be assigned to selectedCity', async () => {
      component.cities = t.city1;
      const c = await loader.getHarness(MatSelectHarness);
      await c.open();
      const opts = await c.getOptions();

      for (let index = 0; index < t.city1.length; index++) {
        await opts[index].click();
        expect(component.selectedCity).toBe(t.city1[index].cityName);
      }
    });

    it('Test2 selected city should be assigned to selectedCity', async () => {
      component.cities = t.city3;
      const c = await loader.getHarness(MatSelectHarness);
      await c.open();
      const opts = await c.getOptions();
      for (let index = 0; index < t.city3.length; index++) {
        await opts[index].click();
        expect(component.selectedCity).toBe(t.city3[index].cityName);
      }
    });

    it('Upload button should call openUploadDialog', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#uploadBtn');
      const spy = spyOn(component, 'uploadDialog');
      btn.click();
      expect(spy).toHaveBeenCalled();
    });

    it('onclick Upload button open Upload-Dialog', async () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#uploadBtn');
      btn.click();
      fixture.detectChanges();
      const dialog = await rootLoader.getHarness(MatDialogHarness);
      let id = await dialog.getId();
      expect(id).toBeDefined();
    });


  });
  /**
   *  Need to test icon
   */
});
