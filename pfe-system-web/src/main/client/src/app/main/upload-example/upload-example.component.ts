import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ToolsService } from '@ayams/services/tools.service';
import { UploadExampleService } from './ulpoad-example.service';
import { random } from 'lodash-es';

@Component({
  selector: 'app-upload-example',
  templateUrl: './upload-example.component.html',
  styleUrls: ['./upload-example.component.scss']
})
export class UploadExampleComponent implements OnInit {

  public onUploadEventSubject: Subject<void>;
  filesToBeAttached: any[];
  isFilesValid: boolean;

  filesToBeShowed: any[];
  
  constructor(private toolsService: ToolsService, private uploadExampleService: UploadExampleService) { 
    this.onUploadEventSubject = new Subject();
    this.isFilesValid = false;

    this.filesToBeAttached = [
      {
        name: 'Ouvrage file 1',
        title: 'Ouvrage file 1',
        format: '.pdf',
        attachmentEntity: 'OUVRAGE',
        attachmentEntityId: null,// set null in case add , if case update set id of entity 
        attachedDocumentType: 'OUVRAGE_EXAMPLE',
        required: true
      },
      {
        name: 'Ouvrage file 2',
        title: 'Ouvrage file 2',
        format: '.pdf',
        attachmentEntity: 'OUVRAGE',
        attachmentEntityId: null,// set null in case add , case update set id of entity 
        attachedDocumentType: 'AUTRE'
      }
    ];


    this.filesToBeShowed = [
      {
        name: 'Ouvrage file 1',
        title: 'Ouvrage file 1',
        format: '.pdf',
        attachmentEntity: 'OUVRAGE',
        attachmentEntityId: '3',
        attachedDocumentType: 'OUVRAGE_EXAMPLE'
      },
      {
        name: 'Ouvrage file 2',
        title: 'Ouvrage file 2',
        format: '.pdf',
        attachmentEntity: 'OUVRAGE',
        attachmentEntityId: '1',
        attachedDocumentType: 'AUTRE'
      }
    ];


  }


  ngOnInit() {
  }


  //------------------------------------------------------------- FOR EXAMPLE 1 -------------------------------------------------//
  onAllRequiredAttached(isFilesValid : boolean):void {
    this.isFilesValid = isFilesValid;
  }

  uploadFiles(entityId : number) : void {

    this.filesToBeAttached.forEach(item => {
      item.attachmentEntityId = entityId.toString();
    });
    
    this.onUploadEventSubject.next();
  }

  errorUploadFiles(): void {
    this.toolsService.hideProgressBar();
    this.toolsService.showError("error Upload Files");
  }

  successUploadFiles(): void {
    this.toolsService.hideProgressBar();
    //this.toolsService.showSuccess("success Upload Files");
  }

  onSubmitFiles(){
        this.uploadFiles(3);  
  }
  //------------------------------------------------------------- FIN FOR EXAMPLE 1 -------------------------------------------------//

}
