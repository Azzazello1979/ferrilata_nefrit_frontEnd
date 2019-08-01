import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PostServiceService } from "src/app/services/post-service.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-submit",
  templateUrl: "./submit.component.html",
  styleUrls: ["./submit.component.css"]
})
export class SubmitComponent implements OnInit {
  submitForm: FormGroup;
  channel: FormGroup;
  isChannelSelected: boolean = true;

  constructor(
    private fb: FormBuilder,
    private postService: PostServiceService,
    private router : Router,
  ) {}
  hasError(controlName: string, errorName: string) {
    return this.submitForm.controls[controlName].hasError(errorName);
  }

  submitData() {
    let post = {
      title: this.submitForm.get("title").value,
      content: this.submitForm.get("content").value,
      channel: this.channel
    };
    this.postService.createPosts(post);
    this.router.navigate(['/'])
  }

  ngOnInit() {
    this.submitForm = this.fb.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required, Validators.maxLength(255)]]
    });
  }

  outputEntity($event: any) {
    this.channel = $event;
    this.isChannelSelected = false;
  }
}