import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    let user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }
    this.authsvc.login(user).subscribe(
      res => this.router.navigate(['/']),
      err => {
        console.log(err)
        //NEED ERROR HANDLING
        //   this.valid = false;
        //     setTimeout(() => {
        //       this.valid = true;
        //     }, 3000)
        // }
      }
    )
  }
    ngOnInit() {
      this.form = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
    }
  }
