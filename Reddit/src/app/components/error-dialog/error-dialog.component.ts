
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {
  errormsg: string;
  statuscode: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    public dialogRef: MatDialogRef<ErrorDialogComponent>
  ) {
    dialogRef.disableClose = true;
    console.log(data);
    this.errormsg = data.message;
    this.statuscode = data.status;
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }
}
