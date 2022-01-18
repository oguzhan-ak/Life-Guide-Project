import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl.errors && !checkControl.errors.matching) {
        console.log("hata yok")
        return null;
      }

      if (control.value !== checkControl.value) {
        console.log("hata var")
        controls.get(checkControlName).setErrors({ matching: true });
        return { matching: true };
      } else {
        console.log("hata yok")
        return null;
      }
    };
  }
  static checkDate(date: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const givendateInput=controls.get(date);
      const givenDate = givendateInput.value;
      if(typeof givenDate == 'object'){
          console.log("obje")
          controls.get(date).setErrors({ checkDateFormat: true });
          return { checkDateFormat: true };
          
      }else{
        console.log('baska')
         return null;
      }
          
    
    //   if (control.value !== checkControl.value) {
    //     controls.get(checkControlName).setErrors({ matching: true });
    //     return { matching: true };
    //   } else {
    //     return null;
    //   }
    return null;
    };
  }
}
