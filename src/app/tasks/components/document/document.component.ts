import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AppSharedService } from 'src/app/services/app-shared.service';
import { isNullOrUndefined } from 'util';
import { UploadFileService } from '../../services/upload-file.service';
import { DocumentDetail } from '../../model/document-detail';
import { TasksService } from '../../services/tasks.service';


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
  documentList: DocumentDetail[];

  // document upload
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  isSubmitted = false;
  @Input() documentDetailData: any;
  preview = false;
  constructor(
    private tasksService: TasksService,
    private uploadService: UploadFileService,
    private appSharedService: AppSharedService) {
  }

  documentDetailsForm = new FormGroup(
    {
      fileType: new FormControl(1),
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
      { field: 'attachment', header: 'Attachments' }
    ];
  }

  /**
   * @description On click of Add Document button handler
   */
  openDialog(): void {
    this.uploadDoc = !this.uploadDoc;
    this.progress = 0;
    this.message = '';
    this.documentDetailsForm.reset();
    this.documentDetailsForm.get('fileType').setValue(1);
  }

  /**
   * @description File type array const
   * //TODO: should be move to constant file
   */
  filetypes(): void {
    this.fileTypes = [
      { label: 'Miscellaneouse', value: 1 },
      { label: 'Payslip', value: 2 },
      { label: 'Salaryslip', value: 3 }
    ];
  }

  /**
   * @description On click of Add Document button handler
   */
  onSubmit(): void {
    this.isSubmitted = true;
    this.upload(this.documentDetailsForm.value);
    if (this.documentDetailsForm.valid) {
      this.isSubmitted = false;
      this.documentDetailsForm.reset();
      this.documentDetailsForm.get('fileType').setValue(1);
    }
  }

  /**
   * @description On click of Cancel button handler
   */
  onCancel(): void {
    this.isSubmitted = false;
    this.uploadDoc = !this.uploadDoc;
  }

  /**
   * @description On click of Choose file click handler
   * @param event event data
   */
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.progress = 0;
    this.message = '';
  }

  /**
   * @description Change event of Description text box
   */
  onDescriptionChange(): void {
    this.progress = 0;
    this.message = '';
  }

  /**
   * @description To upload document service call handler
   * @param doumentData - doucment data request
   */
  upload(doumentData: any) {
    this.progress = 0;
    this.message = '';
    if (!isNullOrUndefined(this.selectedFiles)) {
      this.currentFile = this.selectedFiles.item(0);
    }
    const doucument = this.createDocumentRequest(doumentData);
    if (this.documentDetailsForm.valid) {
      if (!isNullOrUndefined(doucument.taskId)
        && !isNullOrUndefined(doucument.documentTypeId)
        && !isNullOrUndefined(doucument.notes)
        && !isNullOrUndefined(this.documentDetailData.accountDetail.accountNumber)) {
        this.uploadService.upload(doucument, this.currentFile).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            if (this.progress === 100) {
              this.message = 'Uploaded the file successfully!';
              if (!isNullOrUndefined(event.body)) {
                this.documentList = event.body;
              }
              // After file uploaded sucessfully back to document list
              this.onCancel();
            }
          }
        },
          err => {
            this.progress = 0;
            this.message = 'Could not upload the file!';
            this.currentFile = undefined;
          });
      }
    }
    this.selectedFiles = undefined;
  }

  /**
   * @description
   * @param  doumentData - doucument data request
   * @returns DocumentDetail
   */
  createDocumentRequest(doumentData: any): DocumentDetail {
    const document = new DocumentDetail();
    document.taskId = this.documentDetailData.id;
    document.documentTypeId = doumentData.fileType;
    document.notes = doumentData.description;
    let accountNumber = null;
    if (!isNullOrUndefined(this.documentDetailData.accountDetail)
      && !isNullOrUndefined(this.documentDetailData.accountDetail.accountNumber)) {
      accountNumber = this.documentDetailData.accountDetail.accountNumber;
    }
    document.accountNumber = accountNumber;
    return document;
  }

  /**
   * @description File type dropdown valuve change event handler
   * @param event - event value pass
   */
  onFileTypeChange(event: any): void {
    this.selectedFileTypeId = event.value;
    this.progress = 0;
    this.message = '';
  }

  /**
   * @description To Get document list
   */
  getTaskDetails(): void {
    if (!isNullOrUndefined(this.documentDetailData)) {

      let accountNumber = null;
      if (!isNullOrUndefined(this.documentDetailData.accountDetail)
        && !isNullOrUndefined(this.documentDetailData.accountDetail.accountNumber)) {
          accountNumber = this.documentDetailData.accountDetail.accountNumber;
      }
      const contactCenterReq: any = {
        accountNo: accountNumber,
        id: this.documentDetailData.id,
        taskType: 'Contact Center'
      };
      this.tasksService.
        getTaskDetails(contactCenterReq).subscribe(data => {
          if (!isNullOrUndefined(data)
            && !isNullOrUndefined(data.documents)) {
            this.documentList = data.documents;
          }
        });
    }
  }

  public removeDocument(rowData: DocumentDetail): void {
    console.log(rowData);
    if (!isNullOrUndefined(rowData) && !isNullOrUndefined(rowData.documentId)) {
      this.tasksService.deleteDocumentByTaskId(rowData.documentId).subscribe(response => {
        if (!isNullOrUndefined(response)) {
          this.documentList = response;
        }
      });
    }
  }

  onPreviewCancel(): void {
    this.preview = !this.preview;
  }

  public viewDocument(rowData: DocumentDetail): void {
    console.log(rowData);
    this.preview = !this.preview;
    this.uploadDoc = false;
  }

  get formAltaControls(): any {
    return this.documentDetailsForm.controls;
  }

  get description(): FormControl {
    return this.documentDetailsForm.get('description') as FormControl;
  }

  get fileName(): FormControl {
    return this.documentDetailsForm.get('fileName') as FormControl;
  }
}
