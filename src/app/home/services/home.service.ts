import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class HomeService extends BaseService<any> {

  constructor(http: HttpClient) {
    super(http);
  }

  getTaskList(): Observable<any> {
    return this.get(`${this.taskManagementServiceUrl}/getServiceReqTasks`);
  }
}
