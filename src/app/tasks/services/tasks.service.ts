import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { AppSharedService } from 'src/app/services/app-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends BaseService {

  constructor(http: HttpClient, appSharedService: AppSharedService) {
    super(http, appSharedService);
  }

  getDocumentDetails(): Observable<any> {
    return this.get('assets/json/document-details.json');
  }

  saveContactCenterTaskDetails(taskDetails): Observable<any> {
    return this.post(`${this.taskManagementServiceUrl}/saveTask`, taskDetails);
  }

  getTaskDetails(contactCenterReq): Observable<any> {
    return this.post(`${this.taskManagementServiceUrl}/getTaskDetails`, contactCenterReq);
  }
}
