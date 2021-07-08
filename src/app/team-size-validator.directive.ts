import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appTeamSizeValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TeamSizeValidatorDirective, multi: true }]
})
export class TeamSizeValidatorDirective implements Validator {
  constructor() {
  }

  @Input("appTeamSizeValidator") n: string | number = 0;

  validate(control: AbstractControl): ValidationErrors | null {
    let currentValue = control.value;
    let isValid: any = currentValue % this.n == 0 as number;

    if (isValid) {
      return null; //valid
    }
    else {
      return { divisible: { valid: false } }; //indicates invalid
    }
  }

}
