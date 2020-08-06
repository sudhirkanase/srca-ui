import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { AccountSummaryComponent } from './account-summary.component';
import { AccountSharedService } from '../../services/account-shared.service';
import { AccountService } from '../../services/account.service';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { AccountTasksComponent } from '../account-tasks/account-tasks.component';


describe('AccountSummaryComponent', () => {
  let component: AccountSummaryComponent;
  let fixture: ComponentFixture<AccountSummaryComponent>;
  let accountSharedServiceSpy: any;
  let accountServiceSpy: any;
  let accountSharedService: AccountSharedService;
  let accountService: AccountService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async(() => {
    accountSharedServiceSpy = jasmine.createSpyObj('AccountSharedService', ['getAccountNumber', 'setAccountNumber']);
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getTaskListByAccountNo', 'getAccountByAccountNumber',
      'getTaskListByAccountNo']);
    accountSharedServiceSpy.getAccountNumber.and.returnValue(of({ accountNumber: 1001 }));
    accountServiceSpy.getAccountByAccountNumber.and.returnValue(of({ accountNumber: 1001 }));
    accountServiceSpy.getTaskListByAccountNo.and.returnValue(of({ taskId: 11 }));

    TestBed.configureTestingModule({
      imports: [PanelModule, TabViewModule, ButtonModule, TableModule, FormsModule, NoopAnimationsModule,
        ReactiveFormsModule, RouterTestingModule],
      declarations: [AccountSummaryComponent, AccountDetailsComponent, AccountTasksComponent],
      providers: [
        { provide: AccountSharedService, useValue: accountSharedServiceSpy },
        { provide: AccountService, useValue: accountServiceSpy },

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
    accountSharedService = TestBed.get(AccountSharedService);
    accountService = TestBed.get(AccountService);
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
    expect(accountSharedService.setAccountNumber).toHaveBeenCalledWith(component.accountNumber);
    expect(component.getAccountDetails).toHaveBeenCalled();
    expect(component.getTaskListByAccountNo).toHaveBeenCalled();
  });

  it(`should call getAccountByAccountNumber after getAccountDetails `, () => {
    component.getAccountDetails();
    expect(accountService.getAccountByAccountNumber).toHaveBeenCalledWith(component.accountNumber);
  });

  it(`should call getTaskListByAccountNo after getTaskListByAccountNo `, () => {
    component.accountNumber = null;
    component.getTaskListByAccountNo();
    expect(accountService.getTaskListByAccountNo).toHaveBeenCalled();
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
