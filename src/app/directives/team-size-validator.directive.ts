import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appTeamSizeValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TeamSizeValidatorDirective, multi: true }]
})
export class TeamSizeValidatorDirective implements Validator {
  @Input("appTeamSizeValidator") n: number | any;

  validate(control: AbstractControl): ValidationErrors | null {
    const currentValue = control.value;
    const isValid = currentValue % this.n == 0;

    if (isValid) {
      return null; //valid
    }
    else {
      return { divisible: { valid: false } }; //indicates invalid
    }
  }

}
