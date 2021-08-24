import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() { }

  getCurrentDateTime() {
    var date = new Date();
  
    function addZero(x: number) {
        let y = x.toString();
        if (x < 10) {
            y = "0" + y;
        }
        return y;
    }
    
    var currentDateTime =
        (date.getFullYear()) + "-" +
        (addZero(date.getMonth() + 1)) + "-" +
        addZero(date.getDate()) + "T" +
        date.getHours() + ":" +
        addZero(date.getMinutes()) + ":" +
        addZero(date.getSeconds());

    return currentDateTime;
  }

}








