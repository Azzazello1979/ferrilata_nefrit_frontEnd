import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'elapsedTime' })
export class PipeService implements PipeTransform {
//milliseconds

  timeNow: number;
  elapsedTime: number;
  year: number = 31556926000;
  month: number = 2629743000;
  day: number = 86400000;
  hour: number = 3600000;
  yearsAgo: number;
  monthsAgo: number;
  daysAgo: number;
  hoursAgo: number;

  constructor() { }

  transform(actionTimeStamp: number): string { // actionTimeStamp: any user action, like click or submit/post
    this.timeNow = Date.now() ;
    this.elapsedTime = this.timeNow - actionTimeStamp;
    this.yearsAgo = Math.floor(this.elapsedTime / this.year);
    this.monthsAgo = Math.floor(this.elapsedTime / this.month);
    this.daysAgo = Math.floor(this.elapsedTime / this.day);
    this.hoursAgo = Math.floor(this.elapsedTime / this.hour);
    if (this.elapsedTime > this.year) {
      return (`${this.yearsAgo} years ago.`);
    } else if (this.elapsedTime < this.year && this.elapsedTime > this.month) {
      return (`${this.monthsAgo} months ago.`);
    } else if (this.elapsedTime < this.month && this.elapsedTime > this.day) {
      return (`${this.daysAgo} days ago.`);
    } else if (this.elapsedTime < this.day && this.elapsedTime > this.hour) {
      return (`${this.hoursAgo} hours ago.`);
    } else if (this.elapsedTime < this.hour) {
      return (`Just now.`);
    }

  }

}
