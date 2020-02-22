import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrintService } from './print.service';

@Component({
    selector: 'print',
    templateUrl: './print.component.html',
    styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
    @ViewChild('pdfViewer', { static: true }) public pdfViewer;

    constructor(
        private printService: PrintService,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        var params = this.getAllUrlParams(null);

        if (Object.entries(params).length > 0) {
            this.preview(params);
        } else {
            this.router.navigateByUrl('**');
        }
    }

    preview(data) {
        // url can be local url or remote http request to an api/pdf file.
        // E.g: let url = "assets/pdf-sample.pdf";
        // E.g: https://github.com/intbot/ng2-pdfjs-viewer/tree/master/sampledoc/pdf-sample.pdf
        // E.g: http://localhost:3000/api/GetMyPdf
        // Please note, for remote urls to work, CORS should be enabled at the server. Read: https://enable-cors.org/server.html

        this.printService
            .downloadFile(decodeURIComponent(data.url))
            .subscribe(res => {
                this.pdfViewer.pdfSrc = res;
                this.pdfViewer.refresh();

                if (data.autoprint) {
                    const iframeDoc = document.getElementsByTagName('iframe')[0]
                        .contentWindow;
                    setTimeout(() => {
                        iframeDoc.print();
                    }, 1000);
                }
            });
    }

    getAllUrlParams(url) {
        var queryString = url
            ? url.split('?')[1]
            : window.location.search.slice(1);
        var obj = {};

        if (queryString) {
            queryString = queryString.split('#')[0];
            var arr = queryString.split('&');

            for (var i = 0; i < arr.length; i++) {
                var a = arr[i].split('=');

                var paramName = a[0];
                var paramValue = typeof a[1] === 'undefined' ? true : a[1];

                if (paramName.match(/\[(\d+)?\]$/)) {
                    var key = paramName.replace(/\[(\d+)?\]/, '');
                    if (!obj[key]) obj[key] = [];

                    if (paramName.match(/\[\d+\]$/)) {
                        var index = /\[(\d+)\]/.exec(paramName)[1];
                        obj[key][index] = paramValue;
                    } else {
                        obj[key].push(paramValue);
                    }
                } else {
                    if (!obj[paramName]) {
                        obj[paramName] = paramValue;
                    } else if (
                        obj[paramName] &&
                        typeof obj[paramName] === 'string'
                    ) {
                        obj[paramName] = [obj[paramName]];
                        obj[paramName].push(paramValue);
                    } else {
                        obj[paramName].push(paramValue);
                    }
                }
            }
        }

        return obj;
    }
}
