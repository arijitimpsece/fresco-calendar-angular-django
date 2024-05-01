import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayEditorComponent } from './holiday-editor.component';
import { TestingModModule } from 'src/app/testing-mod/testing-mod.module';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HolidayService } from 'src/app/services/holiday.service';
import { of, Subject } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';


describe('HolidayEditorComponent', () => {
  let loader;
  let rootLoader;
  let component: HolidayEditorComponent;
  let fixture: ComponentFixture<HolidayEditorComponent>;
  let servArr = [
    'userDate$',
    'monthViewUpdateNotifier$',
    'sendUserSelectedDateId',
    'getSelectedHolidayInfo',
    'monthComponentNotify',
    'addHoliday',
    'updateHoliday',
    'removeHoliday'
  ];
  let holidayServiceObj = jasmine.createSpyObj('HolidayService', servArr);
  holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of({}));
  holidayServiceObj.addHoliday.and.returnValue(of(200));
  holidayServiceObj.updateHoliday.and.returnValue(of(200));
  holidayServiceObj.removeHoliday.and.returnValue(of(200));
  let userDate;
  const t = new TestingModModule();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HolidayEditorComponent],
      imports: [
        TestingModModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: HolidayService, useValue: holidayServiceObj },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    userDate = new Subject<any>();
    holidayServiceObj.userDate$ = userDate.asObservable();
    const setDate = new Date('2019/02/14');
    jasmine.clock().mockDate(setDate);
    fixture = TestBed.createComponent(HolidayEditorComponent);
    component = fixture.componentInstance;
    component.city = 'ddddd';
    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    component.selectedDate = '20/02/2019';
    fixture.detectChanges();

    holidayServiceObj.getSelectedHolidayInfo.calls.reset();
    holidayServiceObj.addHoliday.calls.reset();
    holidayServiceObj.updateHoliday.calls.reset();

    holidayServiceObj.removeHoliday.calls.reset();

    holidayServiceObj.monthComponentNotify.calls.reset();

  });
  describe('TS file', () => {

    it('getSelectedHolidayInfo should call getSelectedHolidayInfo() in HolidayService', () => {
      component.selectedDate = t.viewEditObj1.date;
      component.city = t.viewEditObj1.city;
      component.getSelectedHolidayInfo();
      expect(holidayServiceObj.getSelectedHolidayInfo).toHaveBeenCalledWith(t.viewEditObj1.date, t.viewEditObj1.city);

      component.selectedDate = t.viewEditObj2.date;
      component.city = t.viewEditObj2.city;
      component.getSelectedHolidayInfo();
      expect(holidayServiceObj.getSelectedHolidayInfo).toHaveBeenCalledWith(t.viewEditObj2.date, t.viewEditObj2.city);
    });

    it('getSelectedHolidayInfo should not call getSelectedHolidayInfo() in HolidayService  when selected date is lesser than current date',
      () => {
        component.selectedDate = '24/05/2018';
        component.city = 'ccccc';
        component.getSelectedHolidayInfo();
        expect(holidayServiceObj.getSelectedHolidayInfo).not.toHaveBeenCalled();

        component.selectedDate = '03/02/2015';
        component.city = 'chsgdsd';
        component.getSelectedHolidayInfo();
        expect(holidayServiceObj.getSelectedHolidayInfo).not.toHaveBeenCalled();

      });

    it('T1 getSelectedHolidayInfo should assign response data to holidayObj', async(() => {
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of(t.viewEditObj1));
      component.selectedDate = t.viewEditObj1.date;
      component.city = t.viewEditObj1.city;
      component.getSelectedHolidayInfo();
      holidayServiceObj.getSelectedHolidayInfo(t.viewEditObj1.date, t.viewEditObj1.city).subscribe(res => {
        expect(component.holidayObj).toEqual(t.viewEditObj1);
      });
    }));

    it('T2 getSelectedHolidayInfo should assign response data to holidayObj', async(() => {
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of({}));
      component.selectedDate = t.viewEditObj1.date;
      component.city = t.viewEditObj1.city;
      component.getSelectedHolidayInfo();
      holidayServiceObj.getSelectedHolidayInfo(t.viewEditObj1.date, t.viewEditObj1.city).subscribe(res => {
        expect(component.holidayObj).toEqual({});
      });
    }));

    it('T1 getSelectedHolidayInfo should assign the holidayName to holidayEditor form', async(() => {
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of(t.viewEditObj1));
      component.selectedDate = t.viewEditObj1.date;
      component.city = t.viewEditObj1.city;
      component.getSelectedHolidayInfo();
      holidayServiceObj.getSelectedHolidayInfo(t.viewEditObj1.date, t.viewEditObj1.city).subscribe(res => {
        expect(component.holidayEditor.get('holidayName').value).toBe(t.viewEditObj1.holidayName);
      });
    }));

    it('T2 getSelectedHolidayInfo should assign the holidayName to holidayEditor form', async(() => {
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of(t.viewEditObj2));
      component.selectedDate = t.viewEditObj2.date;
      component.city = t.viewEditObj2.city;
      component.getSelectedHolidayInfo();
      holidayServiceObj.getSelectedHolidayInfo(t.viewEditObj2.date, t.viewEditObj2.city).subscribe(res => {
        expect(component.holidayEditor.get('holidayName').value).toBe(t.viewEditObj2.holidayName);
      });
    }));

    it('T3 getSelectedHolidayInfo should reset form if response is empty', async(() => {
      component.holidayEditor.setValue({ holidayName: t.viewEditObj2.holidayName });
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of({}));
      component.selectedDate = t.viewEditObj2.date;
      component.city = t.viewEditObj2.city;
      component.getSelectedHolidayInfo();
      holidayServiceObj.getSelectedHolidayInfo(t.viewEditObj2.date, t.viewEditObj2.city).subscribe(res => {

        expect(component.holidayEditor.get('holidayName').value).toBeNull();
      });
    }));

    it('getSelectedHolidayInfo() -> editorFlag should be true', () => {
      const setDate = new Date('2020/02/14');
      jasmine.clock().mockDate(setDate);
      fixture.detectChanges();
      component.selectedDate = '15/05/2020';
      component.city = 'ccccc';
      component.getSelectedHolidayInfo();
      expect(component.editorFlag).toBeTruthy();

      component.selectedDate = '20/06/2020';
      component.city = 'ccccc';
      component.getSelectedHolidayInfo();
      expect(component.editorFlag).toBeTruthy();
    });

    it('getSelectedHolidayInfo() -> editorFlag should be false', () => {
      const setDate = new Date('2020/08/14');
      jasmine.clock().mockDate(setDate);
      fixture.detectChanges();
      component.selectedDate = '15/05/2020';
      component.city = 'cccc';
      component.getSelectedHolidayInfo();
      expect(component.editorFlag).toBeFalsy();

      component.selectedDate = '20/06/2020';
      component.city = 'ccccc';
      component.getSelectedHolidayInfo();
      expect(component.editorFlag).toBeFalsy();
    });

    it('addHoliday should use HolidayService function addHoliday', () => {
      component.holidayEditor.get('holidayName').setValue('TD');
      component.selectedDate = '20/06/2020';
      component.city = 'hhjv';
      component.addHoliday();
      expect(holidayServiceObj.addHoliday).toHaveBeenCalledWith('20/06/2020', 'hhjv', 'TD');
      component.holidayEditor.get('holidayName').setValue('dhasgfbjk');
      component.selectedDate = '02/06/2020';
      component.city = 'hsshjv';
      component.addHoliday();
      expect(holidayServiceObj.addHoliday).toHaveBeenCalledWith('02/06/2020', 'hsshjv', 'dhasgfbjk');

    });

    it('addHoliday() should call getSelectedHolidayInfo ', async(() => {
      let cc = spyOn(component, 'getSelectedHolidayInfo');
      component.addHoliday();
      holidayServiceObj.addHoliday().subscribe(res => {
        expect(cc).toHaveBeenCalled();
      });
    }));

    it('addHoliday() should call monthComponentNotify after addHoliday response ', async(() => {
      component.addHoliday();
      holidayServiceObj.addHoliday().subscribe(res => {
        expect(holidayServiceObj.monthComponentNotify).toHaveBeenCalled();
      });
    }));


    it('updateHoliday should use HolidayService function updateHoliday', () => {
      component.holidayEditor.get('holidayName').setValue(t.viewEditObj1.holidayName);
      component.selectedDate = t.viewEditObj1.date;
      component.city = t.viewEditObj1.city;
      component.holidayObj = t.viewEditObj1;
      component.updateHoliday();
      expect(holidayServiceObj.updateHoliday).toHaveBeenCalledWith(t.viewEditObj1.id, t.viewEditObj1.date,
        t.viewEditObj1.city, t.viewEditObj1.holidayName);
      component.holidayEditor.get('holidayName').setValue(t.viewEditObj2.holidayName);
      component.selectedDate = t.viewEditObj2.date;
      component.city = t.viewEditObj2.city;
      component.holidayObj = t.viewEditObj2;
      component.updateHoliday();
      expect(holidayServiceObj.updateHoliday).toHaveBeenCalledWith(t.viewEditObj2.id, t.viewEditObj2.date, t.viewEditObj2.city,
        t.viewEditObj2.holidayName);

    });

    it('updateHoliday() should call getSelectedHolidayInfo ', () => {
      component.holidayObj = t.viewEditObj1;
      component.editorFlag = true;
      let cc = spyOn(component, 'getSelectedHolidayInfo');
      component.updateHoliday();
      holidayServiceObj.updateHoliday().subscribe(res => {
        expect(cc).toHaveBeenCalled();
      });
    });

    it('updateHoliday() should call monthComponentNotify after addHoliday response ', () => {
      component.holidayObj = t.viewEditObj1;
      component.editorFlag = true;
      component.updateHoliday();
      holidayServiceObj.updateHoliday().subscribe(res => {
        expect(holidayServiceObj.monthComponentNotify).toHaveBeenCalled();
      });
    });


    it('removeHoliday should use HolidayService function removeHoliday', () => {

      component.holidayObj = t.viewEditObj1;
      component.removeHoliday();
      expect(holidayServiceObj.removeHoliday).toHaveBeenCalledWith(t.viewEditObj1.id);

      component.holidayObj = t.viewEditObj2;
      component.removeHoliday();
      expect(holidayServiceObj.removeHoliday).toHaveBeenCalledWith(t.viewEditObj2.id);
    });

    it('removeHoliday() should call monthComponentNotify, holidayObj to be {} and reset holidayEditor form after removing Holiday',
      async(() => {
        component.holidayObj = t.viewEditObj1;
        component.holidayEditor.controls.holidayName.setValue('slajkdnhjks');
        component.removeHoliday();
        holidayServiceObj.removeHoliday().subscribe(res => {
          expect(component.holidayObj).toEqual({});
          expect(component.holidayEditor.controls.holidayName.value).toBeNull();
          expect(holidayServiceObj.monthComponentNotify).toHaveBeenCalled();
        });
      }));


    it('Test1 userDate$ => should call getSelectedHolidayInfo when userDate updates, and assign updated date to selectedDate ',
      () => {
        holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of(t.viewEditObj1));
        component.city = t.viewEditObj1.city;
        const s = spyOn(component, 'getSelectedHolidayInfo');
        holidayServiceObj.userDate$.subscribe(res => {
          expect(s).toHaveBeenCalled();
          expect(component.selectedDate).toBe(t.viewEditObj1.date);
        });

        userDate.next(t.viewEditObj1.date);
      });


    it('Test2 userDate$ => should call getSelectedHolidayInfo when userDate updates, and assign updated date to selectedDate ',
      () => {
        holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of(t.viewEditObj2));
        component.city = t.viewEditObj2.city;
        const s = spyOn(component, 'getSelectedHolidayInfo');
        holidayServiceObj.userDate$.subscribe(res => {
          expect(s).toHaveBeenCalled();
          expect(component.selectedDate).toBe(t.viewEditObj2.date);
        });

        userDate.next(t.viewEditObj2.date);
      });

  });

  describe('HTML file', () => {

    it('New entry-> Add button should be displayed, save and remove button should not be displayed', () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of({}));
      component.holidayObj = {};
      component.holidayEditor.setValue({ holidayName: '' });
      fixture.detectChanges();

      let debugElement = fixture.debugElement;
      let actionSection = debugElement.query(By.css('.styleActionButton'));
      let btns = actionSection.queryAll(By.css('button'));
      expect(btns.length).toBe(1);
      let label = btns[0].nativeElement.textContent.trim();
      expect(label).toBe('Add');
    });

    it('Existing Holiday-> Add button should not be displayed, save and remove button should be displayed', () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of(t.viewEditObj1));
      component.holidayObj = t.viewEditObj1;
      component.holidayEditor.setValue({ holidayName: t.viewEditObj1.holidayName });
      fixture.detectChanges();
      let debugElement = fixture.debugElement;
      let actionSection = debugElement.query(By.css('.styleActionButton'));
      let btns = actionSection.queryAll(By.css('button'));
      expect(btns.length).toBe(2);
      let label = btns[0].nativeElement.textContent.trim();
      expect(label).toBe('Save');
      label = btns[1].nativeElement.textContent.trim();
      expect(label).toBe('Remove');
    });

    it('Add button to be disabled', () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of({}));
      component.holidayObj = {};
      component.holidayEditor.setValue({ holidayName: '' });
      fixture.detectChanges();
      let debugElement = fixture.debugElement;
      let actionSection = debugElement.query(By.css('.styleActionButton'));
      let btn = actionSection.nativeElement.querySelectorAll('button')[0];
      expect(btn.disabled).toBeTruthy();
      let holidayName = debugElement.nativeElement.querySelector('#holidayName');

      holidayName.value = '';
      holidayName.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(btn.disabled).toBeTruthy();
    });


    it('Add button to be enabled', () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of({}));
      component.holidayObj = {};
      component.holidayEditor.setValue({ holidayName: '' });
      fixture.detectChanges();
      let debugElement = fixture.debugElement;
      let actionSection = debugElement.query(By.css('.styleActionButton'));
      let btn = actionSection.nativeElement.querySelectorAll('button')[0];
      expect(btn.disabled).toBeTruthy();
      let holidayName = debugElement.nativeElement.querySelector('#holidayName');
      holidayName.value = 'dfdfdf';
      holidayName.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(btn.disabled).toBeFalsy();
    });

    it('Click=>Add button should call addHoliday()', () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of({}));
      component.holidayObj = {};
      component.holidayEditor.setValue({ holidayName: '' });
      fixture.detectChanges();
      let debugElement = fixture.debugElement;
      let actionSection = debugElement.query(By.css('.styleActionButton'));
      let btn = actionSection.nativeElement.querySelectorAll('button')[0];
      let holidayName = debugElement.nativeElement.querySelector('#holidayName');
      holidayName.value = 'dfdfdf';
      holidayName.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      let spyObj = spyOn(component, 'addHoliday');
      btn.click();
      expect(spyObj).toHaveBeenCalled();
    });


    it('Save button to be disabled', () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of(t.viewEditObj1));
      component.holidayObj = t.viewEditObj1;
      component.holidayEditor.setValue({ holidayName: t.viewEditObj1.holidayName });
      fixture.detectChanges();
      let debugElement = fixture.debugElement;
      let actionSection = debugElement.query(By.css('.styleActionButton'));
      let btn = actionSection.nativeElement.querySelectorAll('button')[0];
      let holidayName = debugElement.nativeElement.querySelector('#holidayName');
      holidayName.value = '';
      holidayName.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(btn.disabled).toBeTruthy();
    });

    it('Save button to be enabled', () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of(t.viewEditObj1));
      component.holidayObj = t.viewEditObj1;
      component.holidayEditor.setValue({ holidayName: t.viewEditObj1.holidayName });
      fixture.detectChanges();
      let debugElement = fixture.debugElement;
      let actionSection = debugElement.query(By.css('.styleActionButton'));
      let btn = actionSection.nativeElement.querySelectorAll('button');
      expect(btn[0].disabled).toBeFalsy();
      let holidayName = debugElement.nativeElement.querySelector('#holidayName');
      holidayName.value = 'dfdfdf';
      holidayName.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(btn[0].disabled).toBeFalsy();

    });

    it('Click=>Save button should call updateHoliday()', () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of(t.viewEditObj1));
      component.holidayObj = t.viewEditObj1;
      component.holidayEditor.setValue({ holidayName: t.viewEditObj1.holidayName });
      fixture.detectChanges();
      let debugElement = fixture.debugElement;
      let actionSection = debugElement.query(By.css('.styleActionButton'));
      let btn = actionSection.nativeElement.querySelectorAll('button');
      let holidayName = debugElement.nativeElement.querySelector('#holidayName');
      holidayName.value = 'dfdfdf';
      holidayName.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      let spyObj = spyOn(component, 'updateHoliday');
      btn[0].click();
      expect(spyObj).toHaveBeenCalled();
    });

    it('remove button to be enabled', () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of(t.viewEditObj1));
      component.holidayObj = t.viewEditObj1;
      component.holidayEditor.setValue({ holidayName: t.viewEditObj1.holidayName });
      fixture.detectChanges();
      let debugElement = fixture.debugElement;
      let actionSection = debugElement.query(By.css('.styleActionButton'));
      let btn = actionSection.nativeElement.querySelectorAll('button');
      expect(btn[1].disabled).toBeFalsy();
    });

    it('Click=>Remove button should call removeHoliday()', () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of(t.viewEditObj1));
      component.holidayObj = t.viewEditObj1;
      component.holidayEditor.setValue({ holidayName: t.viewEditObj1.holidayName });
      fixture.detectChanges();
      let debugElement = fixture.debugElement;
      let actionSection = debugElement.query(By.css('.styleActionButton'));
      let btn = actionSection.nativeElement.querySelectorAll('button');
      let spyObj = spyOn(component, 'removeHoliday');
      btn[1].click();
      expect(spyObj).toHaveBeenCalled();

    });

    it('Test1 display error message for holidayName text field', async () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of({}));
      component.holidayObj = {};
      component.holidayEditor.setValue({ holidayName: '' });
      fixture.detectChanges();
      let formField = await loader.getAllHarnesses(MatFormFieldHarness);

      let nativeComponents = fixture.debugElement.nativeElement;

      let holidayName = nativeComponents.querySelector('#holidayName');

      holidayName.value = '12515151';
      holidayName.dispatchEvent(new Event('input'));

      await (await formField[0].getControl()).blur();
      await fixture.whenStable();

      let res1 = await formField[0].hasErrors();
      expect(res1).toBeTruthy();

      let res2 = await formField[0].getTextErrors();
      expect(res2[0]).toBe('Holiday name should contain only alphabets');
    });

    it('Test2 display error message for holidayName text field', async () => {
      component.editorFlag = true;
      holidayServiceObj.getSelectedHolidayInfo.and.returnValue(of({}));
      component.holidayObj = {};
      component.holidayEditor.setValue({ holidayName: '' });
      fixture.detectChanges();
      let formField = await loader.getAllHarnesses(MatFormFieldHarness);

      let nativeComponents = fixture.debugElement.nativeElement;
      let holidayName = nativeComponents.querySelector('#holidayName');

      holidayName.value = '';
      holidayName.dispatchEvent(new Event('input'));

      await (await formField[0].getControl()).blur();
      await fixture.whenStable();

      let res1 = await formField[0].hasErrors();
      expect(res1).toBeTruthy();

      let res2 = await formField[0].getTextErrors();
      expect(res2[0]).toBe('Enter HolidayName');
    });


  });

});

@Component({
  template: `<app-holiday-editor [city]="city" ></app-holiday-editor>`
})
export class TestHostTComponent {
  @ViewChild(HolidayEditorComponent) vw;
  city = 'ffffffffff';

}
describe('TestHost', () => {
  let component: TestHostTComponent;
  let fixture: ComponentFixture<TestHostTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HolidayEditorComponent, TestHostTComponent],
      imports: [
        TestingModModule,
        RouterTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const setDate = new Date('2019/02/14');
    jasmine.clock().mockDate(setDate);
    fixture = TestBed.createComponent(TestHostTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when city change=> editor should call getSelectedHolidayInfo', () => {
    let spyObj = spyOn(component.vw, 'getSelectedHolidayInfo');
    component.city = 'weclome';
    fixture.detectChanges();
    expect(component.city).toBe(component.vw.city);
    expect(spyObj).toHaveBeenCalled();
  });

});