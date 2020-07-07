import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import forEach from 'lodash/forEach';
import { PrintReportDialogService } from './print-report-dialog.service';
import { ToolsService } from '@ayams/services/tools.service';
import { locale as arabic } from './i18n/ar';
import { locale as french } from './i18n/fr';
import { AppDateAdapter, APP_DATE_FORMATS } from '@ayams/components/date-format/format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import * as moment from 'moment';
import trim from 'lodash/trim';

@Component({
  selector: 'print-report-dialog',
  templateUrl: './print-report-dialog.component.html',
  styleUrls: ['./print-report-dialog.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class PrintReportDialogComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<PrintReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toolsService: ToolsService,
    public router: Router, private formBuilder: FormBuilder,
    private printReportDialogService: PrintReportDialogService) {
    this.toolsService.loadTranslations(french, arabic);

    this.form = null;

    // Example with all inputs 
    //this.data.formInputs = [{ name: 'scheduledTourCode', label: 'Code', type: 'text' },
    //{ name: 'periodicity', label: 'period', type: 'number' },
    // { name: 'scheduledTourDate', label: 'Date', type: 'date' },
    // { name: 'active', label: 'active', type: 'checkbox' },
    // { name: 'scheduledTourSelect', label: 'Liste', type: 'select', options: [{ value: '1', viewValue: 'option 1' }, { value: '2', viewValue: 'option 2' }] }]
    // this.data.api = 'print/payment/receipt/{scheduledTourCode}/{scheduledTourDate}/{scheduledTourSelect}';
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    let obj: Object = {};

    forEach(this.data.formInputs, function (input) {
        if (input.type == "checkbox") {
            obj[input.name] = [false, input.required ? Validators.required : null];
        } else {
            obj[input.name] = [null, input.required ? Validators.required : null];
        }
    });

    this.form = this.formBuilder.group(obj);
  }

  generateUrl(): string {
    let url = this.data.api;
    const dto = this.getDto();

    forEach(this.data.formInputs, function (input) {
      url = url.replace('{' + input.name + '}', dto[input.name]);
    });
    return url;
  }

  getDto(): any {

    if (!this.data.formInputs) {
      return null;
    }

    let formValues = this.form.getRawValue();

    forEach(this.data.formInputs, (input) => {
      let inputValue = trim(formValues[input.name]);
      if (input.type == 'date') {
        formValues[input.name] = inputValue ? moment(inputValue).format('DD-MM-YYYY') : null;
      }
      if(input.bodyType == "string[]"){        
        formValues[input.name] = inputValue ? inputValue.split(",") : [];
      }
    });

    return formValues;
  }

  onPrintReport(): void {
    const URL = this.generateUrl();
    const body = this.getDto();

    this.printReportDialogService.printReport(URL, body, this.dialogRef);
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
