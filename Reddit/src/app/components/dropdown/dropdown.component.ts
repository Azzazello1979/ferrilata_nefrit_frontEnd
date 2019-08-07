import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChannelService } from "src/app/services/channel.service";
import { PostServiceService } from "src/app/services/post-service.service";
import { PipeService } from "src/app/pipes/elapsedTimePipe";

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
  selection: string[] = ["Top", "New", "Last week's top"];
  newPosts: any[];

  @Input() entities: any;
  @Input() displayableProperty: string;
  @Input() defaultValue: string;
  @Output() selectionChange = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder,
    private channelsvc: ChannelService,
    private postservice: PostServiceService,
    private pipe: PipeService
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
    this.selectionChange.emit(this.placeholder);

  }

  outputEntity($event: any) {
    console.log($event.value);
    this.selectionChange.emit($event.value);
  }
}
