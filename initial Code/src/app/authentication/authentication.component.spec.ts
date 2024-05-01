import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationComponent } from './authentication.component';
import { of } from 'rxjs';
import { HolidayService } from '../services/holiday.service';
import { Location } from '@angular/common';

import { TestingModModule } from '../testing-mod/testing-mod.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';


describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let location: Location;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let mockHolidayService = jasmine.createSpyObj('HolidayService', ['signIn']);
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationComponent, DashboardComponent]
      ,
      imports: [
        TestingModModule,
        RouterTestingModule.withRoutes([
          { path: '', component: AuthenticationComponent },
          { path: 'dashboard', component: DashboardComponent }]),
        MaterialModule
      ],
      providers: [{
        provide: HolidayService,
        useValue: mockHolidayService
      },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

    fixture.detectChanges();
  
  });

  describe('TS file', () => {

    it('validate() should call holidayServiceObj.signIn', () => {
      mockHolidayService.signIn.and.returnValue(of());
      component.validate();
      expect(mockHolidayService.signIn).toHaveBeenCalled();
    });

    it('validate() should call holidayServiceObj.signIn', () => {
      mockHolidayService.signIn.and.returnValue(of({ status: 1 }));
      component.signInForm.controls.userName.setValue('hello@gmal.ckm');
      component.signInForm.controls.password.setValue('welcome');
      component.validate();
      expect(mockHolidayService.signIn).toHaveBeenCalledWith('hello@gmal.ckm', 'welcome');
      component.signInForm.controls.userName.setValue('ello@gmal.ckm');
      component.signInForm.controls.password.setValue('lcome');
      component.validate();
      expect(mockHolidayService.signIn).toHaveBeenCalledWith('ello@gmal.ckm', 'lcome');
      component.signInForm.controls.userName.setValue('todo@gmal.ckm');
      component.signInForm.controls.password.setValue('lcome');
      component.validate();
      expect(mockHolidayService.signIn).toHaveBeenCalledWith('todo@gmal.ckm', 'lcome');
    });

    it('shoud navigate', async(() => {
      mockHolidayService.signIn.and.returnValue(of({ status: 1 }));
      component.signInForm.controls.userName.setValue('hello@gmal.ckm');
      component.signInForm.controls.password.setValue('welcome');
      component.validate();
      mockHolidayService.signIn('hello@gmal.ckm', 'welcome').subscribe(res => {
        fixture.detectChanges();
        fixture.whenStable().then(res => {
          expect(location.path()).toBe("/dashboard");

        });
      });
    }));

  });
  describe('HTML file', () => {

    it('should show snack bar', async () => {
      mockHolidayService.signIn.and.returnValue(of({ status: 0 }));
      let nativeComponents = fixture.debugElement.nativeElement;
      let btn = nativeComponents.querySelector('#signInBtn');
      expect(btn.disabled).toBeTruthy();
      let userName = nativeComponents.querySelector('#userName');

      let password = nativeComponents.querySelector('#password');
      userName.value = 'welcomefrg@makc.com';
      userName.dispatchEvent(new Event('input'));

      password.value = 'welcomefrgmakc.com';
      password.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      btn.click();
      await fixture.whenStable();
      let cc = await rootLoader.getHarness(MatSnackBarHarness);
      let vc = await cc.getMessage();
      expect(vc).toBe('Invalid password');
    });

    it('Sign in button to be disabled', () => {
      mockHolidayService.signIn.and.returnValue(of({ status: 0 }));
      let nativeComponents = fixture.debugElement.nativeElement;
      let btn = nativeComponents.querySelector('#signInBtn');
      expect(btn.disabled).toBeTruthy();

      let userName = nativeComponents.querySelector('#userName');

      let password = nativeComponents.querySelector('#password');
      userName.value = 'welcomefrgmakc.com';
      userName.dispatchEvent(new Event('input'));

      password.value = 'welcomefr@gmakc.com';
      password.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(btn.disabled).toBeTruthy();


      userName.value = '';
      userName.dispatchEvent(new Event('input'));

      password.value = '';
      password.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(btn.disabled).toBeTruthy();


      userName.value = 'ssdsds@sdfd.com';
      userName.dispatchEvent(new Event('input'));

      password.value = '';
      password.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(btn.disabled).toBeTruthy();


      userName.value = '';
      userName.dispatchEvent(new Event('input'));

      password.value = 'sdsdsdsdsd';
      password.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(btn.disabled).toBeTruthy();

    });


    it('Sign in button to be enabled', () => {
      mockHolidayService.signIn.and.returnValue(of({ status: 1 }));
      let nativeComponents = fixture.debugElement.nativeElement;
      let btn = nativeComponents.querySelector('#signInBtn');
      expect(btn.disabled).toBeTruthy();
      let userName = nativeComponents.querySelector('#userName');

      let password = nativeComponents.querySelector('#password');
      userName.value = 'welcomefrg@makc.com';
      userName.dispatchEvent(new Event('input'));

      password.value = 'welcomefrgmakc.com';
      password.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      expect(btn.disabled).toBeFalsy();

    });
    it('Sign in button should call validate()', () => {
      mockHolidayService.signIn.and.returnValue(of({ status: 1 }));
      let nativeComponents = fixture.debugElement.nativeElement;
      let btn = nativeComponents.querySelector('#signInBtn');
      let userName = nativeComponents.querySelector('#userName');

      let password = nativeComponents.querySelector('#password');
      userName.value = 'welcomefrg@makc.com';
      userName.dispatchEvent(new Event('input'));

      password.value = 'welcomefrgmakc.com';
      password.dispatchEvent(new Event('input'));

      let spt = spyOn(component, 'validate');
      fixture.detectChanges();
      btn.click();
      expect(spt).toHaveBeenCalled();

    });

    it('Test1 display error message for username text field', async () => {
      mockHolidayService.signIn.and.returnValue(of({ status: 0 }));
      let formField = await loader.getAllHarnesses(MatFormFieldHarness);
      let nativeComponents = fixture.debugElement.nativeElement;
      let userName = nativeComponents.querySelector('#userName');

      userName.value = 'welcomefrgmakc.com';
      userName.dispatchEvent(new Event('input'));

      await (await formField[0].getControl()).blur();
      await fixture.whenStable();

      let res1 = await formField[0].hasErrors();
      expect(res1).toBeTruthy();

      let res2 = await formField[0].getTextErrors();
      expect(res2[0]).toBe('Invalid username');
    });

    it('Test2 display error message for username text field', async () => {
      mockHolidayService.signIn.and.returnValue(of({ status: 0 }));
      let formField = await loader.getAllHarnesses(MatFormFieldHarness);
      let nativeComponents = fixture.debugElement.nativeElement;
      let userName = nativeComponents.querySelector('#userName');

      userName.value = '';
      userName.dispatchEvent(new Event('input'));

      await (await formField[0].getControl()).blur();
      await fixture.whenStable();

      let res1 = await formField[0].hasErrors();
      expect(res1).toBeTruthy();

      let res2 = await formField[0].getTextErrors();
      expect(res2[0]).toBe('Enter username');
    });

    it('Test1 display error message for password text field', async () => {
      mockHolidayService.signIn.and.returnValue(of({ status: 0 }));
      let formField = await loader.getAllHarnesses(MatFormFieldHarness);
      let nativeComponents = fixture.debugElement.nativeElement;
      let password = nativeComponents.querySelector('#password');

      password.value = '';
      password.dispatchEvent(new Event('input'));

      await (await formField[1].getControl()).blur();
      await fixture.whenStable();

      let res1 = await formField[1].hasErrors();
      expect(res1).toBeTruthy();

      let res2 = await formField[1].getTextErrors();
      expect(res2[0]).toBe('Enter password');
    });

  });
});
