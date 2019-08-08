import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PostServiceService } from "src/app/services/post-service.service";
import { Router } from '@angular/router';
import { url } from 'inspector';

@Component({
  selector: "app-submit",
  templateUrl: "./submit.component.html",
  styleUrls: ["./submit.component.css"]
})
export class SubmitComponent implements OnInit {
  submitForm: FormGroup;
  submitFormLink: FormGroup;
  channel: FormGroup;
  myreg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/g;
  isChannelSelected: boolean = true;

  constructor(
    private fb: FormBuilder,
    private postService: PostServiceService,
    private router: Router,
  ) {}
  hasError(controlName: string, errorName: string) {
    return this.submitForm.controls[controlName].hasError(errorName);
  }
  hasLinkError(controlName: string, errorName: string) {
    return this.submitFormLink.controls[controlName].hasError(errorName);
  }

  submitData() {
    let post = {
      title: this.submitForm.get("title").value,
      content: this.submitForm.get("content").value,
      channel: this.channel
    };
    this.postService.createPosts(post);
    this.router.navigate(['/']);
  }
  submitLinkData() {
    let postLink = {
      title: this.submitFormLink.get("title").value,
      url: this.submitFormLink.get('url').value,
      channel: this.channel,
      type: 'link',
      content: this.submitFormLink.get('content').value,
    }
    this.postService.createPosts(postLink);
    this.router.navigate(['/']);
  }
  
  ngOnInit() {
    this.submitForm = this.fb.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required, Validators.maxLength(255)]],
    });
    this.submitFormLink = this.fb.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required, Validators.maxLength(255)]],
      url: ['', [Validators.required, Validators.pattern(this.myreg)]]
    });
  }

  outputEntity($event: any) {
    this.channel = $event;
    this.isChannelSelected = false;
  }

}
