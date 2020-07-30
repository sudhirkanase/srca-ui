import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { AppSharedService } from 'src/app/services/app-shared.service';

@Injectable()
export class HomeService extends BaseService {

  constructor(http: HttpClient, appSharedService: AppSharedService) {
    super(http, appSharedService);
  }

  getTaskList(): Observable<any> {
    return this.get(`${this.taskManagementServiceUrl}/getServiceReqTasks`);
  }
}
