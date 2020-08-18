import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { AppSharedService } from 'src/app/services/app-shared.service';
import { Observable } from 'rxjs';
import { DocumentDetail } from '../model/document-detail';
import { Communication } from '../model/communication';
import { Audit } from '../model/audit';

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

  saveContactCenterTaskDetails(taskDetails, taskType): Observable<any> {
    return this.post(`${this.taskManagementServiceUrl}/save/${taskType}`, taskDetails);
  }
  saveAccountMaintenanceTaskDetails(taskDetails, taskType): Observable<any> {
    return this.post(`${this.taskManagementServiceUrl}/save/${taskType}`, taskDetails);
  }

  getTaskDetails(contactCenterReq): Observable<any> {
    return this.post(`${this.taskManagementServiceUrl}/getTaskDetails`, contactCenterReq);
  }

  deleteDocumentByTaskId(documentId: number): Observable<DocumentDetail[]> {
    return this.post(`${this.taskManagementServiceUrl}/deleteDocument`, documentId);
  }

  saveCommunication(communication: Communication): Observable<Communication[]> {
    return this.post(`${this.taskManagementServiceUrl}/saveCommunication`, communication);
  }

  deleteCommunicationByTaskId(communicationId: number): Observable<Communication[]> {
    return this.post(`${this.taskManagementServiceUrl}/deleteCommunication`, communicationId);
  }

  saveAuditDetails(audit: Audit): Observable<Audit[]> {
    return this.post(`${this.taskManagementServiceUrl}/saveAudit`, audit);
  }

  getAuditData(id: number): Observable<Audit[]> {
    return this.post(`${this.taskManagementServiceUrl}/getAuditData`, id);
  }
}
