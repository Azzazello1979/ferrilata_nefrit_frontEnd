import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder,  FormControl, FormGroup, FormArray, NgModel, Validators, } from '@angular/forms';

import { of } from 'rxjs';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  // form: FormGroup;

  entity: FormGroup;

  @Input() private entities: any;
  @Input() private displayableProperty: string;
  @Input() private defaultValue: string;
  @Output() selectedEntity: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder) {

    }


  ngOnInit() {

    this.entity = this.formBuilder.group({
    entity: [null, Validators.required]
    });
    this.entity.get('entity').setValue(this.defaultValue);
    console.log(this.defaultValue);
  }

}
