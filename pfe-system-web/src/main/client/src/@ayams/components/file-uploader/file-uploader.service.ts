import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { API } from 'config/api.config';
import { BehaviorSubject } from 'rxjs';
import { UploadFile } from './model';

const UPLOAD_API = API + '/uploads';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  onUploaderChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  public upload(files: any, urlSpecification: string): { [key: string]: { progress: Observable<number>, uploadResponse: Promise<any> } } {

    const url = UPLOAD_API + '/' + urlSpecification;

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number>, uploadResponse: Promise<any> } } = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', url, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      let filesPromise: any = new Promise((resolve, reject) => {
        this.http.request(req).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {

            // calculate the progress percentage
            const percentDone = Math.round(100 * event.loaded / event.total);

            // pass the percentage into the progress-stream
            progress.next(percentDone);
          } else if (event instanceof HttpResponse) {

            // Close the progress-stream if we get an answer form the API
            // The upload is complete
            progress.complete();
            resolve(event);
          }
        },
          (error) => {
            reject(error);
          });
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable(),
        uploadResponse: filesPromise
      };
    });

    // return the map of progress.observables
    return status;
  }

  getFile(attachmentEntity: string, attachmentEntityId: string, attachedDocumentType: string): Promise<HttpResponse<Blob>> {
    return new Promise((resolve, reject) => {
      this.http.get(API + '/uploads/' + attachmentEntity + '/' + attachmentEntityId + '/' + attachedDocumentType,
        { responseType: 'blob' })
        .subscribe((response: any) => {
          this.onUploaderChanged.next(response);
          resolve(response);
        }, reject);
    });
  }

  getAttachedDocuments(uploadFiles: UploadFile[]): Promise<HttpResponse<Blob>> {
    return new Promise((resolve, reject) => {
      let entities1 = "";
      uploadFiles.forEach((elem) => {
        entities1 += elem.attachmentEntityId + ":" + elem.attachmentEntity + ":" + elem.attachedDocumentType + ",";
      });

      if (entities1 !== "")
        entities1 = entities1.slice(0, entities1.length - 1);

      this.http.get(API + '/uploads?entities=' + entities1)
        .subscribe((response: any) => {
          this.onUploaderChanged.next(response);
          resolve(response);
        }, reject);
    });
  }

}

