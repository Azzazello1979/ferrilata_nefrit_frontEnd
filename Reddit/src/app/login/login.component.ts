import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  username:string;
  password:string;
  constructor(private formBuilder: FormBuilder) { }

  submitData(){
    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

}
