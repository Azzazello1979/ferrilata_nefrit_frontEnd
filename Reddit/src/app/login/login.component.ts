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

  constructor(private fb: FormBuilder, private router: Router, private authsvc: AuthService) { }

  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

  submitData() {
    this.authsvc.sendData(this.form.get('username').value, this.form.get('password').value);
    this.authsvc.checker.subscribe(
      res => {
        if (res == true) {
          this.router.navigate(['/']);
          //       AND the token is saved into the local storage.
          // this.authsvc.sendToken();
          //       AND the refresh token is saved into the local storage.
          // this.authsvc.sendToken();
          //        AND the username is emitted (check description).
        } else {
          this.valid = false;
          setTimeout(() => {
            this.valid = true;
          }, 3000)
        }
      })
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
}
