import { Component, OnInit, Input } from "@angular/core";
import { ChannelService } from "src/app/services/channel.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-submit",
  templateUrl: "./submit.component.html",
  styleUrls: ["./submit.component.css"]
})
export class SubmitComponent implements OnInit {
 submitForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  hasError(controlName: string, errorName: string) {
    return this.submitForm.controls[controlName].hasError(errorName);
  }

  submitData() {
    let post = {
      title: this.submitForm.get("title").value,
      content: this.submitForm.get("content").value,
      channel: this.submitForm.get("entity").value
    };
  }

  ngOnInit() {
    this.submitForm = this.fb.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required, Validators.maxLength(10)]],
      entity: ["",[Validators.required]],
    });
    this.submitForm.valueChanges.subscribe(newVal => console.log(newVal));
  }
}
