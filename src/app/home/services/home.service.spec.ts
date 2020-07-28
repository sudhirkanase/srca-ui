import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });

    service = TestBed.get(HomeService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getTaskList', () => {
    const data: any = {
      taskId: 10001,
      accountNumber: 112351,
      assignee: 'John Doe'
    };

    service.getTaskList().subscribe((response: any[]) => {
      expect(response.length).toBe(1);
      expect(response).toEqual([data]);
    });

    const request = httpMock.expectOne(`${service.taskManagementServiceUrl}/getServiceReqTasks`);
    expect(request.request.method).toBe('GET');
    request.flush([data]);
  });

});
