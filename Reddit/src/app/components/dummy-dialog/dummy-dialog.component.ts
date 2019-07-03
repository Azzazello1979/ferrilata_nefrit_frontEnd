import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { DropdownComponent } from '../dropdown/dropdown.component';
@Component({
  selector: 'app-dummy-dialog',
  templateUrl: './dummy-dialog.component.html',
  styleUrls: ['./dummy-dialog.component.css']
})
export class DummyDialogComponent implements OnInit {
  displayableProperty: any = 'name';
  entities: any = [
    { name: 'Sally', age: 33, email: 'sally@gmail.com' },
    { name: 'John', age: 23, email: 'john@gmail.com' },
    { name: 'Art', age: 43, email: 'art@gmail.com' }
  ];
  selectedValue: any;
  defaultValue: any;
  constructor(private dialog: DialogService) {}

  ngOnInit() {
    // this.dialog.openError('Unknown Error', 400);
  }

}
