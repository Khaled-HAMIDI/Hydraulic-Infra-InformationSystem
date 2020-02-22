import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as datefns from 'date-fns';
import indexOf from 'lodash/indexOf';
import toArray from 'lodash/toArray';
import findIndex from 'lodash/findIndex';
import * as moment from 'moment';

export class AyamsValidators {

  public static requiredAndNotEmptyObjectValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let inputValue = control.value;

      return ((inputValue == null || inputValue.length === 0) ||
        (typeof inputValue === 'object' && Object.keys(inputValue).length == 0)) ? { 'required': true } : null;
    };
  }

  public static amountFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = new RegExp('^[0-9]*$');

      const forbidden = !regex.test(control.value);

      return forbidden ? { 'amountFormat': { value: control.value } } : null;

    };
  }

  public static planificationMargeValidator(margePercentage: number, controlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      var forbidden = false;

      if (control.parent) {
        const controls: AbstractControl[] = toArray(control.parent.parent.controls);
        const controlIndex = indexOf(controls, control.parent);

        if (controlIndex != -1) {
          const periodicity = 12 / controls.length;
          const marge = Math.round((periodicity * 30) * (margePercentage / 100));
          const currentDate = moment(control.value).format('YYYY-MM-DD');
          let diff;

          if (controlIndex != 0) {
            const previousDate = moment(controls[controlIndex - 1].get(controlName).value).format('YYYY-MM-DD');
            diff = datefns.differenceInCalendarDays(currentDate, previousDate);
            if (diff < periodicity * 30 - marge || diff > periodicity * 30 + marge) {
              forbidden = true;
            }
          }

          if (controlIndex == 0) {
            let timerId = setTimeout(() => {
              const nextDate = moment(controls[controlIndex + 1].get(controlName).value).format('YYYY-MM-DD');
              diff = datefns.differenceInCalendarDays(nextDate, currentDate);
            }, 100);

            if (diff < periodicity * 30 - marge || diff > periodicity * 30 + marge) {
              forbidden = true;
            }
            clearTimeout(timerId);
          }
        }
      }
      return forbidden ? { 'marge': { value: 'marge error' } } : null;
    };
  }

  public static planificationOneReleveMargeValidator(margePercentage: number, tour: any, idPlanificationReleve: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      var forbidden = false;

      const scheduledTours: any[] = tour.scheduledTours;
      const planificationReleveIndex = findIndex(scheduledTours, (planificationReleve: any) => {
        return planificationReleve.id == idPlanificationReleve;
      });

      if (planificationReleveIndex != -1) {
        const periodicity = tour.periodicity;
        const marge = Math.round((periodicity * 30) * (margePercentage / 100));
        const currentDate = moment(control.value).format('YYYY-MM-DD');
        let diff;

        if (planificationReleveIndex != 0) {
          const previousDate = moment(scheduledTours[planificationReleveIndex - 1].meterReadDate).format('YYYY-MM-DD');
          diff = datefns.differenceInCalendarDays(currentDate, previousDate);
          if (diff < periodicity * 30 - marge || diff > periodicity * 30 + marge) {
            forbidden = true;
          }
        }

        if (planificationReleveIndex == 0) {
          const nextDate = moment(scheduledTours[planificationReleveIndex + 1].meterReadDate).format('YYYY-MM-DD');
          diff = datefns.differenceInCalendarDays(nextDate, currentDate);
          if (diff < periodicity * 30 - marge || diff > periodicity * 30 + marge) {
            forbidden = true;
          }
        }
      }
      return forbidden ? { 'marge': { value: 'marge error' } } : null;
    };
  }


  public static phoneFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = new RegExp('^(0)[1-9][0-9]{8}$|^(0)[1-9][0-9]{7}$');
      const forbidden = !regex.test(control.value);

      return forbidden ? { 'phoneFormat': { value: control.value } } : null;

    };
  }

  public static characterOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = new RegExp('^[a-zA-Z ]*$');
      const forbidden = !regex.test(control.value);

      return forbidden ? { 'inputFormat': { value: control.value } } : null;

    };
  }
}