import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChannelService } from "src/app/services/channel.service";
import { Router } from "@angular/router";
import { PostServiceService } from "src/app/services/post-service.service";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"]
})
export class DropdownComponent implements OnInit {
  @Input() entity: FormGroup;
  channels: string[];
  placeholder: string = "Please select";
  channel: string;
  newPosts: any[];

  @Input() entities: any;
  @Input() displayableProperty: string;
  @Input() defaultValue: string;
  @Output() selectionChange = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private channelsvc: ChannelService,
    private postservice: PostServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.entity = this.formBuilder.group({
      entity: [null, Validators.required]
    });
    this.entity.get("entity").setValue(this.defaultValue);

    const receivedChannels = this.channelsvc.getAllChannels();
    receivedChannels.subscribe((channelsvcData: any) => {
      this.channels = channelsvcData;
    });

    const newPosts = this.postservice.getPosts();
    newPosts.subscribe((postData: any) => {
      this.newPosts = postData;
    });
    this.selectionChange.emit(this.entity.value);
  }

  selectedChannel() {
    this.entities = this.channels;
    this.channel = this.entity.value.entity;
    this.selectionChange.emit(this.channel);
    if (this.channel !== undefined) {
      this.router.navigate([`/${this.channel}`])
      console.log('a');
    }
  }

  selectedFreshPosts() {
    this.entities = this.newPosts.map(post => post.title);
    this.selectionChange.emit(this.entity.value);
    this.channel === undefined;
    this.router.navigate([`/submit`])
  }
}
