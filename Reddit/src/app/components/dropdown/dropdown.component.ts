import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChannelService } from "src/app/services/channel.service";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"]
})
export class DropdownComponent implements OnInit {
  @Input() entity: FormGroup;
  selectedValue: string;
  channels: string[];
  @Input() entities: any;
  @Input() displayableProperty: string;
  @Input() defaultValue: string;
  @Output() selectionChange = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private channelsvc: ChannelService
  ) {}

  ngOnInit() {
    const receivedChannels = this.channelsvc.getAllChannels();
    receivedChannels.subscribe((channelsvcData: any) => {
      this.channels = channelsvcData;
      this.entities = this.channels;
    });
  /*   this.entity = this.formBuilder.group({
      entity: [null, [Validators.required]]
    });
    this.entity.get("entity").setValue(this.defaultValue); */
  }

  outputEntity() {
    this.selectionChange.emit(this.entity.value.entity);
    console.log(this.entity.value);
    console.log(this.selectedValue);
  }
}
