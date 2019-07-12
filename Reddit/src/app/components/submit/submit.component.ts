import { Component, OnInit } from '@angular/core';
import { ChannelService } from "src/app/services/channel.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

  constructor( 
     private channelsvc: ChannelService,) { }
  entity: FormGroup;
  channels: string[];
  public selectedValue;

  ngOnInit() {
    const receivedChannels = this.channelsvc.getAllChannels();
    receivedChannels.subscribe((channelsvcData: any) => {
      this.channels = channelsvcData;
    });
 /*    this.channels = this.formBuilder.group({
      entity: [null, Validators.required]
    }); 
    this.entity.get("entity").setValue(this.selectedValue);*/
  }

}
