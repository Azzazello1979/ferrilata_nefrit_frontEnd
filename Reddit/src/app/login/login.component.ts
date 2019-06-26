import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  submitData() {  
    this.username = this.form.get('UN').value;
    this.password = this.form.get('PW').value;
    // sendback
    // succes:this.form.get('first').setValue('some value');
    // this.form.get('first').setValue('some value');
    // err(showerr)
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      UN: [null, Validators.required],
      PW: [null, Validators.required],
    });
  }

}
