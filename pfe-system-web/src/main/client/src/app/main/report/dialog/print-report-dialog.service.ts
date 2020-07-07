import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'config/api.config';
import { ToolsService } from '@ayams/services/tools.service';

@Injectable()
export class PrintReportDialogService {

    constructor(private http: HttpClient,
        private toolsService: ToolsService) {
    }

    createReport(URL: string, body: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(API + '/' + URL, body, { responseType: 'blob' })
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    onPrint(data: any) {
        if (data.autoPrint) {
            window.open(window.URL.createObjectURL(data.fileContent)).print();
        } else {
            window.open(window.URL.createObjectURL(data.fileContent));
        }
    }

    printReport(URL: string, body: any, dialogRef: any): void {
        this.toolsService.showProgressBar();
        this.createReport(URL, body)
            .then((response: any) => {
                this.onPrint({
                    'fileContent': response, 'autoPrint': false
                });
            },
                (error) => {
                    this.toolsService.showError('TOAST.upload-error');

                }).finally(
                    () => {
                        this.toolsService.hideProgressBar();
                        dialogRef.close();
                    });;
    }

}
