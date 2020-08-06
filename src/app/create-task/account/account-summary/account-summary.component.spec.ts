import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountSummaryComponent } from './account-summary.component';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTaskSharedService } from '../../services/create-task-shared.service';
import { Account } from './../../model/Account';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { CreateTaskService } from '../../services/create-task.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('AccountSummaryComponent', () => {
  let component: AccountSummaryComponent;
  let fixture: ComponentFixture<AccountSummaryComponent>;
  let createTaskSharedServiceSpy: any;
  let createTaskServiceSpy: any;
  let createTaskSharedService: CreateTaskSharedService;
  let createTaskService: CreateTaskService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async(() => {
    createTaskSharedServiceSpy = jasmine.createSpyObj('CreateTaskSharedService', ['getAccountNumber', 'setAccountNumber']);
    createTaskServiceSpy = jasmine.createSpyObj('CreateTaskService', ['getTaskListByAccountNo', 'getAccountByAccountNumber',
      'getTaskListByAccountNo']);
    createTaskSharedServiceSpy.getAccountNumber.and.returnValue(of({ accountNumber: 1001 }));
    createTaskServiceSpy.getAccountByAccountNumber.and.returnValue(of({ accountNumber: 1001 }));
    createTaskServiceSpy.getTaskListByAccountNo.and.returnValue(of({ taskId: 11 }));

    TestBed.configureTestingModule({
      imports: [PanelModule, TabViewModule, ButtonModule, TableModule, FormsModule, NoopAnimationsModule,
        ReactiveFormsModule, RouterTestingModule],
      declarations: [AccountSummaryComponent, AccountDetailsComponent],
      providers: [
        { provide: CreateTaskSharedService, useValue: createTaskSharedServiceSpy },
        { provide: CreateTaskService, useValue: createTaskServiceSpy },

        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              data: {
                type: ''
              }
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryComponent);
    createTaskSharedService = TestBed.get(CreateTaskSharedService);
    createTaskService = TestBed.get(CreateTaskService);
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);

    component = fixture.componentInstance;
    window.history.pushState({ data: 'somevalue' }, '', '');
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    spyOn(component, 'getAccountNumber').and.returnValue();
    component.ngOnInit();
    expect(component.getAccountNumber).toHaveBeenCalled();
    expect(component.tasks.length).toBe(0);
  });

  it(`should call setAccountNumber after getAccountNumber `, () => {
    spyOn(component, 'getAccountDetails');
    spyOn(component, 'getTaskListByAccountNo');
    component.getAccountNumber();
    expect(createTaskSharedService.setAccountNumber).toHaveBeenCalledWith(component.accountNumber);
    expect(component.getAccountDetails).toHaveBeenCalled();
    expect(component.getTaskListByAccountNo).toHaveBeenCalled();
  });

  it(`should call getAccountByAccountNumber after getAccountDetails `, () => {
    component.getAccountDetails();
    expect(createTaskService.getAccountByAccountNumber).toHaveBeenCalledWith(component.accountNumber);
  });

  it(`should call getTaskListByAccountNo after getTaskListByAccountNo `, () => {
    component.accountNumber = null;
    component.getTaskListByAccountNo();
    expect(createTaskService.getTaskListByAccountNo).toHaveBeenCalled();
  });

  it('should navigate to search component on back button click ', () => {
    spyOn(component, 'handleBackBtnClick');
    const backBtn: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    backBtn.click();
    fixture.detectChanges();
    expect(component.handleBackBtnClick).toHaveBeenCalled();
  });

  it('navigate to "search" takes you to /search', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.handleBackBtnClick();
    expect(router.navigate).toHaveBeenCalledWith(['./../search'], { relativeTo: activatedRoute });
  });

  // it('should navigate to contact center on call createNewTask ', () => {
  //   spyOn(component, 'createNewTask');
  //   component.createNewTask('Contact Center', 'contact-center');
  //   const panelRows: HTMLDivElement = fixture.debugElement.query(By.css('p-panel > a.pointer')).nativeElement;
  //   panelRows.click();
  //   fixture.detectChanges();
  //   expect(component.createNewTask).toHaveBeenCalledWith('Contact Center', 'contact-center');

  //   expect(router.navigate).toHaveBeenCalledWith(['../contact-center'], {
  //     state: { data: component.actionDetails },
  //     queryParams: { action: 'create' },
  //     relativeTo: activatedRoute
  //   });
  // });



});
