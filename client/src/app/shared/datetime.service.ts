import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() { }

  getCurrentDateTime() {
    var date = new Date();
    var amPm = "AM";
  
    function addZero(x: number) {
        let y = x.toString();
        if (x < 10) {
            y = "0" + y;
        }
        return y;
    }
  
    function checkAmPm(x: number) {
        if (x > 12) {
            x = x - 12;
            amPm = "PM";
        }
        return x;
    }
  
    var currentDateTime =
        (date.getFullYear()) + "-" +
        (addZero(date.getMonth() + 1)) + "-" +
        addZero(date.getDate()) + " " +
        checkAmPm(date.getHours()) + ":" +
        addZero(date.getMinutes()) + ":" +
        addZero(date.getSeconds()) + " " +
        amPm;
        ;
  
    return currentDateTime;
  }


}








