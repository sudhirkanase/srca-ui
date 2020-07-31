
import { Component, OnInit, Input, SimpleChanges, ValueSansProvider, OnChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateTaskService } from 'src/app/create-task/services/create-task.service';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/create-task/services/UploadFileService.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DocumentDetail } from '../../../model/doucument-detail';
import { isNullOrUndefined } from 'util';
import { AppSharedService } from 'src/app/services/app-shared.service';


@Component({
  selector: 'srca-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})


export class DocumentComponent implements OnInit, OnChanges {
  uploadDoc = false;
  cols: any[];
  documents: [];
  fileTypes: SelectItem[];
  selectedFileTypeId = 1;
  documentList: [];

  // document upload
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  @Input() documentDetailData: any;
  constructor(
    private createTaskService: CreateTaskService,
    private uploadService: UploadFileService,
    private appSharedService: AppSharedService) {
  }

  documentDetailsForm = new FormGroup(
    {
      fileType: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      fileName: new FormControl('', Validators.required)
    }
  );

  ngOnChanges(changes: SimpleChanges) {
    if (changes.documentDetailData.previousValue !== changes.documentDetailData.currentValue) {
      setTimeout(() => {
        this.documentList = this.documentDetailData;
        this.getDocumentsdetails();
      });
    }
  }

  ngOnInit() {
    this.getDocumentsdetails();
    this.filetypes();

    this.cols = [
      { field: 'documentName', header: 'Document' },
      { field: 'dueDate', header: 'Due By' },
      { field: 'added', header: 'Added' },
      { field: 'notes', header: 'Notes' },
      { field: 'additionalInst', header: 'Additional Instructions' },
      { field: 'attachment', header: 'Attachments' },
      { field: 'documentAction', header: 'Action' }
    ];

  }


  get formAltaControls(): any {
    return this.documentDetailsForm.controls;
  }

  openDialog() {
    console.log('btn clicked');
    this.uploadDoc = !this.uploadDoc;
  }

  filetypes() {
    this.fileTypes = [
      { label: 'Miscellaneouse', value: 1 },
      { label: 'Text', value: 2 },
      { label: 'PDF', value: 3 },
      { label: 'JPEG', value: 4 },
      { label: 'PNG', value: 5 }
    ];
  }

  onSubmit() {
    console.log(this.documentDetailsForm.value);
    this.upload(this.documentDetailsForm.value);
  }
  onCancel() {
    this.uploadDoc = !this.uploadDoc;
    this.getDocumentsdetails();
  }

  // upload file code
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(doumentData: any) {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    let doucument = this.createDocumentRequest(doumentData);
    this.uploadService.upload(doucument, this.currentFile).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

  createDocumentRequest(doumentData: any): DocumentDetail {
     let document = new DocumentDetail();
     document.taskId = this.documentDetailData.id;
     document.documentTypeId = doumentData.fileType;
     document.notes = doumentData.description;
     return document;
  }

  onFileTypeChange(event: any): void {
    this.selectedFileTypeId = event.value;
  }

  /**
   * @description To get document list to show in table
   */
  getDocumentsdetails(): void {
    if (!isNullOrUndefined(this.documentDetailData)) {
      const contactCenterReq: any = {
        accountNo: null,
        id: this.documentDetailData.id,
        taskType: 'Contact Center'
      };

      this.createTaskService.getTaskDetails(contactCenterReq).subscribe(data => {
        if (!isNullOrUndefined(data) && !isNullOrUndefined(data.documents)) {
          this.documentList = data.documents;
        }
      });
    }
  }

}
