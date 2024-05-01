import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDialogComponent } from './upload-dialog.component';

import { MaterialModule } from '../../material/material.module';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TestingModModule } from 'src/app/testing-mod/testing-mod.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HolidayService } from 'src/app/services/holiday.service';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UploadDialogComponent', () => {
  let component: UploadDialogComponent;
  let fixture: ComponentFixture<UploadDialogComponent>;

  let maTref = jasmine.createSpyObj('MatDialogRef', ['close', 'afterOpened']);
  let holidayServiceObj = jasmine.createSpyObj('HolidayService', ['uploadFile']);
  maTref.close.and.returnValue(of());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDialogComponent],
      imports: [
        RouterTestingModule,
        TestingModModule,
        MaterialModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: maTref },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('TS file', () => {
    it('closeDialog should close dialog with file as parameter when userResponse is true', () => {
      let file = new File(['a', 'b'], 'test.csv');
      component.file = file;
      component.closeDialog(true);
      expect(maTref.close).toHaveBeenCalledWith(file);
    });

    it('closeDialog should close dialog without any parameter when userResponse is false', () => {
      maTref.close.and.returnValue(of());
      component.closeDialog(false);
      expect(maTref.close).toHaveBeenCalledWith();
    });

    it('openFileExplorer should open file explorer by clicking #fileUpload DOM element', () => {
      let spyObj = spyOn(document.getElementById('fileUpload'), 'click');
      component.openFileExplorer();
      expect(spyObj).toHaveBeenCalled();
    });

  });

  describe('HTML file', () => {
    it('#actionBtnsToUpload should not exists', () => {
      let container = fixture.debugElement.nativeElement.querySelector('#actionBtnsToUpload');
      expect(container).toBeFalsy();
    });

    it('#actionBtnsToUpload should exists', () => {
      let file = new File(['a', 'b'], 'test.csv');
      component.file = file;
      fixture.detectChanges();
      let container = fixture.debugElement.nativeElement.querySelector('#actionBtnsToUpload');
      expect(container).toBeTruthy();
    });

    it('Yes button should call closeDialog', () => {
      let spyObj = spyOn(component, 'closeDialog');
      let file = new File(['a', 'b'], 'test.csv');
      component.file = file;
      fixture.detectChanges();
      let container = fixture.debugElement.query(By.css('#actionBtnsToUpload'));
      let btn = container.queryAll(By.css('button'))[0];
      btn.nativeElement.click();
      expect(spyObj).toHaveBeenCalledWith(true);
    });

    it('No button should call closeDialog', () => {
      let spyObj = spyOn(component, 'closeDialog');
      let file = new File(['a', 'b'], 'test.csv');
      component.file = file;
      fixture.detectChanges();
      let container = fixture.debugElement.query(By.css('#actionBtnsToUpload'));
      let btn = container.queryAll(By.css('button'))[1];
      btn.nativeElement.click();
      expect(spyObj).toHaveBeenCalledWith(false);
    });

    it('#fileStatusSelected should not exists', () => {
      let div = fixture.debugElement.nativeElement.querySelector('#fileStatusSelected');
      expect(div).toBeFalsy();
    });

    it('#fileStatusSelected should exists', () => {
      let file = new File(['a', 'b'], 'test.csv');
      component.file = file;
      fixture.detectChanges();
      let container = fixture.debugElement.nativeElement.querySelector('#fileStatusSelected');
      expect(container).toBeTruthy();
    });

    it('#fileDrop should exists if file not selected', () => {
      let container = fixture.debugElement.nativeElement.querySelector('#fileDrop');
      expect(container).toBeTruthy();
    });

    it('#fileDrop should not exists if file selected', () => {
      let file = new File(['a', 'b'], 'test.csv');
      component.file = file;
      fixture.detectChanges();
      let container = fixture.debugElement.nativeElement.querySelector('#fileDrop');
      expect(container).toBeFalsy();
    });
  });

});
