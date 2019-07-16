import { Component, OnInit } from "@angular/core";
import { ChannelService } from "src/app/services/channel.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-submit",
  templateUrl: "./submit.component.html",
  styleUrls: ["./submit.component.css"]
})
export class SubmitComponent implements OnInit {
  form: FormGroup;
  valid: boolean = true;
  channel: string;

  constructor(private fb: FormBuilder) {}

  hasError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }
  outputEntity($event: any) {
    this.channel = $event;
  }

  submitData() {
    let post = {
      title: this.form.get("title").value,
      content: this.form.get("content").value,
      channel: this.channel
    };
    console.log(post);
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required, Validators.maxLength(10)]],  
      channel: ['this.channel',  [Validators.required]]
    });
  }
}
