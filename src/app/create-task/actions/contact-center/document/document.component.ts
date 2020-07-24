
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateTaskService } from 'src/app/create-task/services/create-task.service';
import { Observable } from 'rxjs';
import { UploadFileService } from 'src/app/create-task/services/UploadFileService.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'srca-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})


export class DocumentComponent implements OnInit {
  uploadDoc: boolean = false
  cols: any[];
  documents: [];
  fileTypes: SelectItem[];

  //document upload
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  @Input() DocumentDetailData: any;
  constructor(private documentService: CreateTaskService, private uploadService: UploadFileService) { }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.DocumentDetailData.previousValue !== changes.DocumentDetailData.currentValue) {
      setTimeout(() => {
        this.documents = this.DocumentDetailData
      });
    }
  }

  ngOnInit() {
    this.getDocumentsdetails()

    this.filetypes()

    this.cols = [
      { field: 'documentName', header: 'Document' },
      { field: 'dueDate', header: 'Due By' },
      { field: 'added', header: 'Added' },
      { field: 'notes', header: 'Notes' },
      { field: 'additionalInst', header: 'Additional Instructions' },
      { field: 'attachment', header: 'Attachments' },
      { field: 'documentAction', header: 'Action' }
    ]

  }

  documentDetailsForm = new FormGroup(
    {
      fileType: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      fileName: new FormControl('', Validators.required)
    }
  )
  get formAltaControls(): any {
    return this.documentDetailsForm['controls'];
  }

  openDialog() {
    console.log("btn clicked")
    this.uploadDoc = !this.uploadDoc
  }

  filetypes() {
    this.fileTypes = [
      { label: 'Miscellaneouse', value: null },
      { label: 'Text', value: { id: 2, name: 'Text', code: 'TT' } },
      { label: 'PDF', value: { id: 3, name: 'PDF', code: 'PD' } },
      { label: 'JPEG', value: { id: 4, name: 'JPEG', code: 'JPG' } },
      { label: 'PNG', value: { id: 5, name: 'PNG', code: 'PNG' } }
    ];
  }

  getDocumentsdetails() {
    // this.documentService.getDocumentDetails().subscribe(data =>{
    //   console.log(data)
    //   this.documents = data
    // })
  }

  onSubmit() {
    console.log(this.documentDetailsForm.value)
    this.upload()
  }
  onCancel() {
    this.uploadDoc = !this.uploadDoc
  }

  //upload file code
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          console.log("uploaded")
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

}