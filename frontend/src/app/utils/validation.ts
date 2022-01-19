import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static checkDate(date: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const givendateInput=controls.get(date);
      const givenDate = givendateInput.value;
      if(typeof givenDate == 'object'){
        return null;  
      }else{
        controls.get(date).setErrors({ checkDateFormat: true });
        return { checkDateFormat: true };
      }
    };
  }
  static checkDateBigger(date: string): ValidatorFn {
    return (controls: AbstractControl) => {
      let currentDateObject={
        "day" : "",
        "month" : "",
        "year" : ""
      }
      const givendateInput=controls.get(date);
      const givenDate = givendateInput.value;
      if(typeof givenDate == 'object'){
        let currentDate:Date = new Date();
        currentDateObject.year= currentDate.getFullYear().toString()
        currentDateObject.month= (currentDate.getMonth()+1).toString()
        currentDateObject.day= currentDate.getDate().toString()
        if(givenDate.year > currentDateObject.year){
          controls.get(date).setErrors({ checkDateBigger: true });
          return { checkDateBigger: true };
        }else if(givenDate.year == currentDateObject.year){
          if(givenDate.month > currentDateObject.month){
            controls.get(date).setErrors({ checkDateBigger: true });
            return { checkDateBigger: true };
          }else if(givenDate.month == currentDateObject.month){
            if(givenDate.day > currentDateObject.day){
              controls.get(date).setErrors({ checkDateBigger: true });
              return { checkDateBigger: true };
            }else if(givenDate.day == currentDateObject.day){
              return null;
            }else{
              return null
            }
          }else{
            return null
          }
        }else{
          return null
        }
      }else{
        return null;
      }
    };
  }
}
