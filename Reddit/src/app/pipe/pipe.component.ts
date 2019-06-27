import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})




@Pipe({ name: 'timeStamp' })
export class PipeComponent implements PipeTransform {

  timeNow: any;
  elapsedTime: any;
  yearsAgo: any = this.elapsedTime / 31556926000;
  monthsAgo: any = this.elapsedTime / 2629743000;
  daysAgo: any = this.elapsedTime / 86400000;
  hoursAgo: any = this.elapsedTime / 3600000;

  constructor() {
    this.timeNow = Date.now();
  }



  transform(actionTimeStamp: any): any { // actionTimeStamp, like user click or user submit/post
    this.elapsedTime = this.timeNow - actionTimeStamp;
    

    if (this.elapsedTime > 31556926000) {
      return (`${this.yearsAgo} years ago.`);
    } else if (this.elapsedTime < 31556926000 && this.elapsedTime > 2629743000) {
      return (`${this.monthsAgo} months ago.`);
    } else if (this.elapsedTime < 2629743000 && this.elapsedTime > 86400000) {
      return (`${this.daysAgo} days ago.`);
    } else if (this.elapsedTime < 86400000 && this.elapsedTime > 3600000) {
      return (`${this.hoursAgo} hours ago.`);
    } else if (this.elapsedTime < 3600000) {
      return (`Just now.`);
    }

  }




}
