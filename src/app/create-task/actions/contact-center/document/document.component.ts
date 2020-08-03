
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { CreateTaskService } from 'src/app/create-task/services/create-task.service';
import { UploadFileService } from 'src/app/create-task/services/upload-file.service';
import { AppSharedService } from 'src/app/services/app-shared.service';
import { isNullOrUndefined } from 'util';
import { DocumentDetail } from '../../../model/doucument-detail';


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
  isSubmitted = false;
  @Input() documentDetailData: any;
  constructor(
    private createTaskService: CreateTaskService,
    private uploadService: UploadFileService,
    private appSharedService: AppSharedService) {
  }

  documentDetailsForm = new FormGroup(
    {
      fileType: new FormControl(''),
      description: new FormControl('', Validators.required),
      fileName: new FormControl('', Validators.required)
    }
  );

  ngOnChanges(changes: SimpleChanges) {
    if (changes.documentDetailData.previousValue !== changes.documentDetailData.currentValue) {
      setTimeout(() => {
        if (!isNullOrUndefined(this.documentDetailData)
          && !isNullOrUndefined(this.documentDetailData.documents)) {
          this.documentList = this.documentDetailData.documents;
        }
      });
    }
  }

  ngOnInit() {
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
    this.uploadDoc = !this.uploadDoc;
  }

  filetypes() {
    this.fileTypes = [
      { label: 'Miscellaneouse', value: 1 },
      { label: 'Payslip', value: 2 },
      { label: 'Salaryslip', value: 3 }
    ];
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.documentDetailsForm.value);
    this.upload(this.documentDetailsForm.value);
    if (this.documentDetailsForm.valid) {
      this.isSubmitted = false;
      this.documentDetailsForm.reset();
    }
  }

  onCancel() {
    this.isSubmitted = false;
    this.uploadDoc = !this.uploadDoc;
    this.getTaskDetails();
  }

  // upload file code
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(doumentData: any) {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    const doucument = this.createDocumentRequest(doumentData);
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
    const document = new DocumentDetail();
    document.taskId = this.documentDetailData.id;
    document.documentTypeId = doumentData.fileType;
    document.notes = doumentData.description;
    return document;
  }

  onFileTypeChange(event: any): void {
    this.selectedFileTypeId = event.value;
  }

  // To Get document list
  getTaskDetails() {
    if (!isNullOrUndefined(this.documentDetailData)) {
      let accountNumber = null;
      if (!isNullOrUndefined(this.documentDetailData.accountDetail)
        && !isNullOrUndefined(this.documentDetailData.accountDetail.accountNumber)) {
        accountNumber = this.documentDetailData.accountDetail.accountNumber;
      }
      const contactCenterReq: any = {
        accountNo: this.documentDetailData.accountNo,
        id: this.documentDetailData.id,
        taskType: 'Contact Center'
      };
      this.createTaskService.
        getTaskDetails(contactCenterReq).subscribe(data => {
          if (!isNullOrUndefined(data)
            && !isNullOrUndefined(data.documents)) {
            this.documentList = data.documents;
          }
        });
    }
  }
  get description(): FormControl {
    return this.documentDetailsForm.get('description') as FormControl;
  }
  get fileName(): FormControl {
    return this.documentDetailsForm.get('fileName') as FormControl;
  }
}
