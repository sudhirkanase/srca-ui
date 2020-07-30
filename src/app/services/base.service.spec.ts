import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { BaseService } from './base.service';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppSharedService } from './app-shared.service';

interface TypeModel {
  booleanProperty: boolean;
  stringProperty: string;
  complexProperty: number[];
}

describe('BaseService', () => {
  let service: BaseService;
  let httpMock: HttpTestingController;
  let mockAppSharedService: AppSharedService;

  beforeEach(() => {
    mockAppSharedService = jasmine.createSpyObj('AppSharedService', ['setIsLoading']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BaseService,
        { provide: AppSharedService, useValue: mockAppSharedService }
      ]
    });
    service = TestBed.get(BaseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of items on GET call', () => {
    const data: TypeModel = {
      booleanProperty: true,
      stringProperty: 'test',
      complexProperty: [1, 2, 3]
    };

    const listOfData: TypeModel[] = [data, data];

    service.get('testUrl').subscribe((response: TypeModel[]) => {
      expect(response.length).toBe(2);
      expect(response).toEqual(listOfData);
    });

    const request = httpMock.expectOne(`testUrl`);
    expect(request.request.method).toBe('GET');
    request.flush(listOfData);
  });

  it('should fail to post item on POST call', () => {
    const data: TypeModel = {
      booleanProperty: true,
      stringProperty: 'test',
      complexProperty: [1, 2, 3]
    };

    service.post('testUrl', data).subscribe((response: TypeModel) => { },
      (error: HttpErrorResponse) => {
        expect(error.error).toHaveClass(ErrorEvent);
      });

    const request = httpMock.expectOne(`testUrl`);
    expect(request.request.method).toBe('POST');
    request.error(new ErrorEvent('MouseEvent'));
  });

  it('should post item on POST call', () => {
    const data: TypeModel = {
      booleanProperty: true,
      stringProperty: 'test',
      complexProperty: [1, 2, 3]
    };

    service.post('testUrl', data).subscribe((response: TypeModel) => {
      expect(response).toEqual(data);
    });

    const request = httpMock.expectOne(`testUrl`);
    expect(request.request.method).toBe('POST');
    request.flush(data);
  });

  it('should post item on POST call with options', () => {
    const data: TypeModel = {
      booleanProperty: true,
      stringProperty: 'test',
      complexProperty: [1, 2, 3]
    };
    const options = {
      headers: new HttpHeaders({ 'X-CSRF-TOKEN': 'test-token' })
    };

    service.post('testUrl', data, options).subscribe((response: TypeModel) => {
      expect(response).toEqual(data);
    });

    const request = httpMock.expectOne(`testUrl`);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers).toBe(options.headers);
    request.flush(data);
  });

  it('should update item on PUT call', () => {
    const data: TypeModel = {
      booleanProperty: true,
      stringProperty: 'test',
      complexProperty: [1, 2, 3]
    };

    service.put('testUrl', data).subscribe((response: TypeModel) => {
      expect(response).toEqual(data);
    });

    const request = httpMock.expectOne(`testUrl`);
    expect(request.request.method).toBe('PUT');
    request.flush(data);
  });



  it('should update item on PUT call with options', () => {
    const data: TypeModel = {
      booleanProperty: true,
      stringProperty: 'test',
      complexProperty: [1, 2, 3]
    };
    const options = {
      headers: new HttpHeaders({ 'X-CSRF-TOKEN': 'test-token' })
    };

    service.put('testUrl', data, options).subscribe((response: TypeModel) => {
      expect(response).toEqual(data);
    });

    const request = httpMock.expectOne(`testUrl`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.headers).toBe(options.headers);
    request.flush(data);
  });

  it('should delete item on DELETE call', () => {
    const data: TypeModel = {
      booleanProperty: true,
      stringProperty: 'test',
      complexProperty: [1, 2, 3]
    };

    service.delete('testUrl').subscribe((response: TypeModel) => {
      expect(response).toEqual(data);
    });

    const request = httpMock.expectOne(`testUrl`);
    expect(request.request.method).toBe('DELETE');
    request.flush(data);
  });

  it('should delete item on DELETE call with options', () => {
    const data: TypeModel = {
      booleanProperty: true,
      stringProperty: 'test',
      complexProperty: [1, 2, 3]
    };
    const options = {
      headers: new HttpHeaders({ 'X-CSRF-TOKEN': 'test-token' })
    };

    service.delete('testUrl', options).subscribe((response: TypeModel) => {
      expect(response).toEqual(data);
    });

    const request = httpMock.expectOne(`testUrl`);
    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers).toBe(options.headers);
    request.flush(data);
  });

  it('should fail while deleting item on DELETE call', () => {
    const data: TypeModel = {
      booleanProperty: true,
      stringProperty: 'test',
      complexProperty: [1, 2, 3]
    };

    service.delete('testUrl').subscribe((response: TypeModel) => { },
      ((error: HttpErrorResponse) => {
        expect(error.status).toBe(404);
      }));

    const request = httpMock.expectOne(`testUrl`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null, { status: 404, statusText: 'Item not found' });
  });

  it('should set or get sessionExpired value', () => {
    service.setSessionExpired(true);
    expect(service.isSessionExpired()).toBe(true);
  });

  it('should be able to determine if user is authenticated or not', () => {
    sessionStorage.setItem('AUTH_KEY', 'test_auth_key');
    expect(service.isUserAuthenticated()).toBeTruthy();

    sessionStorage.removeItem('AUTH_KEY');
    expect(service.isUserAuthenticated()).toBeFalsy();
  });

});

