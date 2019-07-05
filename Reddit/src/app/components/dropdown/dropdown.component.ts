import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  entity: FormGroup;

  @Input() private entities: any;
  @Input() private displayableProperty: string;
  @Input() private defaultValue: string;
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter();
  constructor(private formBuilder: FormBuilder) {

    }

  ngOnInit() {
    this.entity = this.formBuilder.group({
    entity: [null, Validators.required]
    });
    this.entity.get('entity').setValue(this.defaultValue);

  }
  outputEntity(event: any) {
    this.selectionChange.emit(event);
  }
}
