import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'config/api.config';
import { ToolsService } from '@ayams/services/tools.service';

@Injectable({
    providedIn: 'root'
  })
export class PrintReportsService {

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

    printReport(URL: string, body: any, autoPrint: boolean = false): void {
        this.toolsService.showProgressBar();
        this.createReport(URL, body)
            .then((response: any) => {
                this.onPrint({
                    'fileContent': response, 'autoPrint': autoPrint
                });
            },
                (error) => {
                    this.toolsService.showError('Error genrate pdf');

                }).finally(
                    () => {
                        this.toolsService.hideProgressBar();
                    });;
    }

}
