import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TaskService {

constructor(private httpClient: HttpClient) { }

getTaskList(): Observable<any> {
  return this.httpClient.get("assets/json/task-list.json");
}

}
