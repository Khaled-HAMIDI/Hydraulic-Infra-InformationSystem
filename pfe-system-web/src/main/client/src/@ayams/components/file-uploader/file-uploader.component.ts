import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadService } from './file-uploader.service';
import { locale as french } from './i18n/fr';
import { locale as arabic } from './i18n/ar';
import find from 'lodash/find';
import { ToolsService } from '@ayams/services/tools.service';
import { Observable } from "rxjs/Observable";
import { UploadFile, EntityName } from './model';
import remove from 'lodash/remove';
import groupBy from 'lodash/groupBy';

@Component({
  selector: 'ayams-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {


  @Input()
  public uploadFiles: UploadFile[] = [];

  @Input()
  public events: Observable<any>;

  @Input()
  public showAndUpdate: boolean;

  @Output()
  errorUpload: EventEmitter<any> = new EventEmitter();

  @Output()
  successUpload: EventEmitter<any> = new EventEmitter();

  @Output()
  allRequiredAttached: EventEmitter<any> = new EventEmitter();

  EntityName = EntityName;

  private eventsSubscription: any;

  titles: string[] = [];
  reg: RegExp = /(?:\.([^.]+))?$/;
  promises: Promise<any>[] = [];
  existFiles: any[];
  entitiesName: string[];

  constructor(
    private uploaderService: UploadService,
    private toolsService: ToolsService
  ) {
    this.toolsService.loadTranslations(french, arabic);
    this.showAndUpdate = this.showAndUpdate || false;
  }

  ngOnInit() {
    this.getAttachedDocuments(this.uploadFiles);

    if (this.showAndUpdate) {
      this.eventsSubscription = this.events.subscribe(() =>
        this.onUploadFiles()
      );
    }
  }

  initialisedUploadFile(): void {
    for (let i = 0; i < this.uploadFiles.length; i++) {

      let title = this.uploadFiles[i]['title'] + ' (' + this.uploadFiles[i]['format'] + ')' || this.toolsService.getTranslation('FILE-UPLOADER.attachment-title');
      this.uploadFiles[i]['notAllowedList'] = [];
      this.uploadFiles[i]['selectedFiles'] = [];
      this.uploadFiles[i]['progress'] = null;
      this.uploadFiles[i]['id'] = this.uploadFiles[i]['id'] || i;
      this.uploadFiles[i]['maxSize'] = this.uploadFiles[i]['maxSize'] || 10; // size Mo
      this.uploadFiles[i]['format'] = this.uploadFiles[i]['format'] || '.jpg,.png,.pdf,.docx,.txt,.gif,.jpeg';
      this.uploadFiles[i]['multiple'] = false;
      this.uploadFiles[i]['fileExiste'] = this.findFile(this.uploadFiles[i]);
      this.uploadFiles[i]['resetUpload'] = this.uploadFiles[i]['fileExiste'];
      this.uploadFiles[i]['title'] = this.uploadFiles[i]['fileExiste'] ? this.uploadFiles[i]['title'] : title;

      this.titles[i] = title;
    }
    this.entitiesName = Object.keys(groupBy(this.uploadFiles, (file) => file.attachmentEntity));
  }

  resetFileUpload(uploadFilesIndex: number): void {
    this.uploadFiles[uploadFilesIndex]['selectedFiles'] = [];
    this.uploadFiles[uploadFilesIndex]['notAllowedList'] = [];
    this.uploadFiles[uploadFilesIndex]['resetUpload'] = false;
    this.uploadFiles[uploadFilesIndex]['title'] = this.titles[uploadFilesIndex];
    this.uploadFiles[uploadFilesIndex]['fileExiste'] = false

    remove(this.existFiles, (exist) => {
      return exist.attachedDocumentType == this.uploadFiles[uploadFilesIndex].attachedDocumentType && exist.attachmentEntity == this.uploadFiles[uploadFilesIndex].attachmentEntity && exist.attachmentEntityId == this.uploadFiles[uploadFilesIndex].attachmentEntityId;
    });

    this.isAttahedFile();
  }

  isAttahedFile() {
    for (let i = 0; i < this.uploadFiles.length; i++)
      if (this.uploadFiles[i].required && this.uploadFiles[i].selectedFiles.length == 0) return this.allRequiredAttached.emit(false);
    
      this.allRequiredAttached.emit(true);
  }

  onChange(event: any, uploadFilesIndex: number): void {
    
    this.uploadFiles[uploadFilesIndex]['notAllowedList'] = [];
    let formatsCount: any;
    formatsCount = this.uploadFiles[uploadFilesIndex]['format'].match(new RegExp('\\.', 'g'));
    formatsCount = formatsCount.length;

    let file: FileList;
    file = event.target.files || event.srcElement.files;
    let currentFileExt: any;
    let ext: any;
    let frmtAllowed: boolean;

    for (let i = 0; i < file.length; i++) {
      currentFileExt = this.reg.exec(file[i].name);
      currentFileExt = currentFileExt[1];
      frmtAllowed = false;

      for (let j = formatsCount; j > 0; j--) {
        ext = this.uploadFiles[uploadFilesIndex]['format'].split('.')[j];
        if (j === formatsCount) {
          ext = this.uploadFiles[uploadFilesIndex]['format'].split('.')[j] + ',';
        }
        if (currentFileExt.toLowerCase() === ext.split(',')[0]) {
          frmtAllowed = true;
        }
      }

      if (frmtAllowed) {
        if (file[i].size > this.uploadFiles[uploadFilesIndex]['maxSize'] * 1024000) {
          this.uploadFiles[uploadFilesIndex]['notAllowedList'].push({
            fileName: file[i].name,
            fileSize: this.convertSize(file[i].size),
            errorMsg: this.toolsService.getTranslation('FILE-UPLOADER.error-size') + this.uploadFiles[uploadFilesIndex]['maxSize'] + ' MO'
          });
          continue;
        } else {
          this.uploadFiles[uploadFilesIndex]['selectedFiles'].push(file[i]);
        }
      } else {
        this.uploadFiles[uploadFilesIndex]['notAllowedList'].push({
          fileName: file[i].name,
          fileSize: this.convertSize(file[i].size),
          errorMsg: this.toolsService.getTranslation('FILE-UPLOADER.error-format')
        });
        continue;
      }
    }

    if (this.uploadFiles[uploadFilesIndex]['selectedFiles'].length !== 0) {
      this.uploadFiles[uploadFilesIndex]['title'] = this.uploadFiles[uploadFilesIndex]['selectedFiles'][0].name;
      this.uploadFiles[uploadFilesIndex]['resetUpload'] = true;
    } else {
      this.uploadFiles[uploadFilesIndex]['resetUpload'] = false;
      this.uploadFiles[uploadFilesIndex]['title'] = this.uploadFiles[uploadFilesIndex]['title'] || this.toolsService.getTranslation('FILE-UPLOADER.attachment-title');
    }
    event.target.value = null;
    this.isAttahedFile();
  }

  onUploadFiles(): void {
    this.promises = [];
    for (let i = 0; i < this.uploadFiles.length; i++) {
      this.onUploadFile(i);
    }
    let promiseAll = new Promise((resolve, reject) => {
      Promise.all(this.promises).then(
        (data) => {
          this.successUpload.emit("ok")
        }, (error) => {
          this.errorUpload.emit("error")
        }
      );
    });
  }

  onUploadFile(uploadFilesIndex: number): void {
    let uploaded = this.uploaderService.upload(this.uploadFiles[uploadFilesIndex]['selectedFiles'], this.uploadFiles[uploadFilesIndex]['attachmentEntity'] + '/' + this.uploadFiles[uploadFilesIndex]['attachmentEntityId'] + '/' + this.uploadFiles[uploadFilesIndex]['attachedDocumentType']);

    if (this.uploadFiles[uploadFilesIndex]['selectedFiles'][0]) {
      this.promises.push(uploaded[this.uploadFiles[uploadFilesIndex]['selectedFiles'][0].name].uploadResponse);
    }

    this.uploadFiles[uploadFilesIndex]['progress'] = uploaded;
  }

  convertSize(fileSize: number): string {
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }

  attachpinOnclick(uploadFiles: UploadFile): void {
    document.getElementById('sel' + uploadFiles.id)!.click();
  }

  ngOnDestroy(): void {
    if (this.showAndUpdate) {
      this.eventsSubscription.unsubscribe();
    }
  }

  getFile(attachmentEntity: string, attachmentEntityId: string, attachedDocumentType: string): void {
    this.uploaderService.getFile(attachmentEntity, attachmentEntityId, attachedDocumentType)
      .then((response: any) => {
        window.open(window.URL.createObjectURL(response));
      }, (error: Error) => {
      });
  }

  findFile(upload: UploadFile): boolean {
    const result = find(this.existFiles, (exist) => {
      return exist.attachedDocumentType == upload.attachedDocumentType && exist.attachmentEntity == upload.attachmentEntity && exist.attachmentEntityId == upload.attachmentEntityId;
    });
    return result ? true : false;
  }

  attachOrGetFile(uploadFilesIndex: number): void {
    const existFile = find(this.existFiles, (exist) => {
      return exist.attachedDocumentType == this.uploadFiles[uploadFilesIndex].attachedDocumentType && exist.attachmentEntity == this.uploadFiles[uploadFilesIndex].attachmentEntity && exist.attachmentEntityId == this.uploadFiles[uploadFilesIndex].attachmentEntityId;
    });

    if (existFile) {
      this.getFile(existFile.attachmentEntity, existFile.attachmentEntityId, existFile.attachedDocumentType);
    } else {
      if (!this.uploadFiles[uploadFilesIndex]['selectedFiles'][0] && this.showAndUpdate)
        this.attachpinOnclick(this.uploadFiles[uploadFilesIndex]);
    }
  }

  getAttachedDocuments(uploadFiles: UploadFile[]): void {
    this.uploaderService.getAttachedDocuments(uploadFiles)
      .then((existFilesResponse: any) => {
        this.existFiles = existFilesResponse;
        this.initialisedUploadFile();
      });
  }
}
