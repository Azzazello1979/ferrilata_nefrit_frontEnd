import { Component, OnInit } from "@angular/core";
import { ChannelService } from "src/app/services/channel.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import {ActivatedRoute, Router, RouterEvent, RouterLink} from '@angular/router'
import {ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: "app-submit",
  templateUrl: "./submit.component.html",
  styleUrls: ["./submit.component.css"]
})



export class SubmitComponent implements OnInit {
  post = {}
  activeRoutedService: any;
/*   @ViewChild('submit2') nameInputRef: ElementRef;
 */

  constructor(private channelsvc: ChannelService, private router: Router) {}
  entity: FormGroup;
  channels: string[];
  public selectedValue;

  ngOnInit() {
        }

  addPost(form: NgForm) {
    const value = form.value;
  }
/*   createBook(){
    this.router.navigate(['/login'])
    this.
  } */
}
