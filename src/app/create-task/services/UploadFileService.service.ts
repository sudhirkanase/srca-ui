import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentDetail } from '../model/doucument-detail';
import { DocumentWithFile } from '../model/document-file';
import { TASK_MANAGEMENT_SERVICES_URL } from 'src/environments/environment';
import { BaseService } from 'src/app/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService{

  private baseUrl = 'http://localhost:8080';
  taskManagementServiceUrl = `${TASK_MANAGEMENT_SERVICES_URL}`;

  constructor(private http: HttpClient) {
  }

  upload(documentDetail: DocumentDetail, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('taskId', documentDetail.taskId.toString());
    formData.append('documentTypeId', documentDetail.documentTypeId.toString());
    formData.append('notes', documentDetail.notes);

    const req = new HttpRequest('POST', `${this.baseUrl}/documentUpload`, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
}
