
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateTaskService } from 'src/app/create-task/services/create-task.service';

@Component({
  selector: 'tmt-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})


export class DocumentComponent implements OnInit {
  uploadDoc:boolean =false
  cols: any[];
  documents: any;
  fileTypes: SelectItem[];

  constructor(private documentService:CreateTaskService) { }

  ngOnInit() {
    this.getDocumentsdetails()    

    this.filetypes()

    this.cols = [
      { field: 'document', header: 'Document'},
      { field: 'dueBy', header: 'Due By'},
      { field: 'added', header: 'Added'},
      { field: 'notes', header: 'Notes'},
      { field: 'additionalInst', header: 'Additional Instructions'},
      { field: 'attchments', header: 'Attachments'},
      { field: 'action', header: 'Action'}
    ]

  }

  documentDetailsForm = new FormGroup(
    {
      fileType : new FormControl('',Validators.required),
      description : new FormControl('',Validators.required)
    }
  )
  get formAltaControls(): any {
    return this.documentDetailsForm['controls'];
 }

  openDialog(){
    console.log("btn clicked")
    this.uploadDoc = !this.uploadDoc
  }

  filetypes(){
    this.fileTypes = [
      {label:'Miscellaneouse', value:null},
      {label:'Text', value:{id:2, name: 'Rome', code: 'RM'}},
      {label:'PDF', value:{id:3, name: 'London', code: 'LDN'}},
      {label:'JPEG', value:{id:4, name: 'Istanbul', code: 'IST'}},
      {label:'PNG', value:{id:5, name: 'Paris', code: 'PRS'}}
  ];
}

getDocumentsdetails(){
  this.documentService.getDocumentDetails().subscribe(data =>{
    console.log(data)
    this.documents = data
  })
}

onSubmit(){
  console.log(this.documentDetailsForm.value)
}
onCancel(){
  this.uploadDoc = !this.uploadDoc
}
}