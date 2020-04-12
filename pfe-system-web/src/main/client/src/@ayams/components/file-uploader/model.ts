import { Observable } from 'rxjs';

export class UploadFile {
  id: number;
  title: string;
  name: string;
  format: string;
  maxSize: number;
  attachmentEntity: string;
  attachmentEntityId: string;
  attachedDocumentType: string;
  resetUpload: boolean
  progress: Progress;
  notAllowedList: NotAllowed[];
  selectedFiles: any[];
  fileExiste: boolean;
  required: boolean = false;
}

export class NotAllowed {
  fileName: string; 
  fileSize: string;
  errorMsg: string;
}

export class Progress{
   [key: string]: { progress: Observable<number>, uploadResponse: Promise<any> } 
}

export enum EntityName {
  OUVRAGE = "OUVRAGE"
}
