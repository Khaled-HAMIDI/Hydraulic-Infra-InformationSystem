import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
})
export class PrintService {

    constructor(private router: Router, private http: HttpClient) {
    }

    onPrint(data: any) {
        let URL = (data.autoPrint) ? `/print?url=${data.url}&autoprint=${data.autoPrint}` : `/print?url=${data.url}`;
        
        if (data.openWindow) {
            this.http.get(data.url, { responseType: 'blob' })
                .subscribe((response: any) => {
                    if(data.autoPrint){
                        window.open(window.URL.createObjectURL(response)).print();
                    }else{
                        window.open(window.URL.createObjectURL(response));
                    }
                });
        }
        else {
            this.router.navigateByUrl(URL);
        }
    }

    downloadFile(url: string): any {
        return this.http.get(url, { responseType: 'blob' }).map(
            (res) => {
                return new Blob([res], { type: "application/pdf" });
            });
    }

}
