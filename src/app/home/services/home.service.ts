import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TASK_MANAGEMENT_SERVICES_URL } from 'src/app/app.constants';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }

  getTaskList(): Observable<any> {
    return this.http.get<any>(`${TASK_MANAGEMENT_SERVICES_URL}/getServiceReqTasks`);
  }
}
