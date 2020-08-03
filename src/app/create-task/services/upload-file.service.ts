import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TASK_MANAGEMENT_SERVICES_URL } from 'src/environments/environment';
import { DocumentDetail } from '../model/doucument-detail';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

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
