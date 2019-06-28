import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() entities: any;
  @Input() displayableProperty: string;
  @Input() defaultValue: number;
  @Output() selectedEntity = new EventEmitter();
  name = new FormControl('');
  constructor() { }

  ngOnInit() {
  }

}
