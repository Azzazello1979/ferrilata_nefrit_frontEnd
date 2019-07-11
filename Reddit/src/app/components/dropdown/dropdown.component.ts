import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material";
import { ChannelService } from "src/app/services/channel.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"]
})
export class DropdownComponent implements OnInit {
  entity: FormGroup;
  channels: string[];
  public selectedValue;

  @Input() private entities: any;
  @Input() private displayableProperty: string;
  @Input() private defaultValue: string;
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private channelsvc: ChannelService,
    private router: Router
  ) {}

  ngOnInit() {
    const receivedChannels = this.channelsvc.getAllChannels();
    receivedChannels.subscribe((channelsvcData: any) => {
      this.channels = channelsvcData;
      this.entities = this.channels;
    });
    this.entity = this.formBuilder.group({
      entity: [null, Validators.required]
    });
    this.entity.get("entity").setValue(this.defaultValue);
  }

  outputEntity(event: any) {
    this.router.navigate([`/${this.selectedValue}`]);
  }
}
