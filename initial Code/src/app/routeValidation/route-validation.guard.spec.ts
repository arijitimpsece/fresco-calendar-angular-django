import { TestBed } from '@angular/core/testing';

import { RouteValidationGuard } from './route-validation.guard';
import { HttpTestingController } from '@angular/common/http/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HolidayViewComponent } from '../dashboard/holiday-view/holiday-view.component';
import { HolidayEditorComponent } from '../dashboard/holiday-editor/holiday-editor.component';
import { UploadDialogComponent } from '../dashboard/upload-dialog/upload-dialog.component';
import { TestingModModule } from '../testing-mod/testing-mod.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../material/material.module';
import { HolidayService } from '../services/holiday.service';
import { Router } from '@angular/router';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

describe('RouteValidationGuard', () => {
  let location: Location;

  let guard: RouteValidationGuard;
  let httpTestingController: HttpTestingController;
  let holidayServiceObj = jasmine.createSpyObj('HolidayService', [
    'authValidator'
  ]);


  let route: Router;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        TestingModModule
      ],
      providers: [
        { provide: HolidayService, useValue: holidayServiceObj }
      ]
    });

    guard = TestBed.inject(RouteValidationGuard);
    route = TestBed.inject(Router);

    location = TestBed.inject(Location);
  });

  it('If authValidator returns true navigate to dashboard', async () => {
    holidayServiceObj.authValidator.and.returnValue(true);
    await route.navigateByUrl('/dashboard');
    expect(route.url).toBe('/dashboard');
  });

  it('If authValidator to returns false navigate to authentication', async () => {
    holidayServiceObj.authValidator.and.returnValue(false);
    await route.navigateByUrl('/dashboard');
    expect(route.url).toBe('/');
  });
});
