import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openError(ErrorMessage, ErrorStatus) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
     data: { message: ErrorMessage, status: ErrorStatus }
    }
    );
  }
}
