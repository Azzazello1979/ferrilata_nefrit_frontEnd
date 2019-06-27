import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  valid: boolean = true;

  constructor(private fb: FormBuilder, private router: Router,private authsvc:AuthService) { }

  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

  submitData() {//NO SERVICE YET
    // if (this.authsvc.sendData(this.form.get('username').value, this.form.get('password').value).response.statusCode == 200) {
    if (this.authsvc.sendData(this.form.get('username').value, this.form.get('password').value)) { //is something
      // this.authsvc.sendToken();
      this.router.navigate(['/']);
    } else {
      // this.form.setValue({
      //   ['username']: '',
      //   ['password']: ''
      // })
      this.valid = false;
      // setTimeout(() => {
      //   this.valid = true;
      // }, 5000)
    }
  }
  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
