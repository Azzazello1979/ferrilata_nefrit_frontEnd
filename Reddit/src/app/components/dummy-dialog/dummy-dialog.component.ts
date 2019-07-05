import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-dummy-dialog',
  templateUrl: './dummy-dialog.component.html',
  styleUrls: ['./dummy-dialog.component.css']
})
export class DummyDialogComponent implements OnInit {

  constructor(private dialog: DialogService) { }

  ngOnInit() {
    this.dialog.openError('Unknown Error', 400);
  }

}
