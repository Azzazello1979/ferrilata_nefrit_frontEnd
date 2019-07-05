import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openError(ErrorMessage, ErrorStatus) {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: ErrorMessage, status: ErrorStatus }
    });
  }
}
