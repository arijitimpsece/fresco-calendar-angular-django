import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HolidayService } from 'src/app/services/holiday.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit, AfterViewInit {

  file: File = null;
  constructor(public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private holidayServiceObj: HolidayService) {

  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    // Listners for darg behaviour
    if (!this.file) {
      document.getElementById('fileDrop').addEventListener('dragover', (event) => {
        event.preventDefault();
      });
      document.getElementById('fileDrop').addEventListener('dragover', this.dragenter);
      document.getElementById('fileDrop').addEventListener('dragleave', this.dragleave);
      document.getElementById('fileDrop').addEventListener('drop', this.dragleave);
    }

  }

  dragenter(event) {
    event.preventDefault();
    document.getElementById('dragOff').style.display = 'none';
    document.getElementById('fileDrop').style.backgroundColor = '#00838F';
  }

  dragleave(event) {
    event.preventDefault();
    if (document.getElementById('dragOff')) {
      document.getElementById('dragOff').style.display = '';
      document.getElementById('fileDrop').style.backgroundColor = '#E0F7FA';
    }
  }

  /**
   * Open file browser
   * Using #fileUpload id open the file explorer to upload file
   */
  openFileExplorer() {
  }

  fileDrop(fileUploadEvent: DragEvent) {
    fileUploadEvent.preventDefault();

    if (fileUploadEvent.dataTransfer.items) {

      // DataTransferItemList interface
      if (fileUploadEvent.dataTransfer.items[0].kind === 'file') {
        this.file = fileUploadEvent.dataTransfer.items[0].getAsFile();
      }
    } else {
      // DataTransfer interface
      this.file = fileUploadEvent.dataTransfer.files[0];
    }
  }

  /*
   * closeDialog()
   * if userResponse is true =>close the dialog and send file to dashboard.
   * if userResponse is false => close the dialog
  */
  closeDialog(userResponse) {

  }

}
