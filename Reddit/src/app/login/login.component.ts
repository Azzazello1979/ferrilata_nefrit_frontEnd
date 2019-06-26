import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

  // submitData() {
  //   if (this.svc.sendData(this.form.get('username'), this.form.get('password')).response.statusCode == 200) {
  //     this.svc.sendData(this.form.get('username'), this.form.get('password'));
  //     this.router.navigate(['/forecast/:userid']);
  //   } else
  //     return false
  // }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
