import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AccountSearchComponent } from './account-search.component';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Account } from './../../model/Account';
import { CreateTaskService } from '../../services/create-task.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('AccountSearchComponent', () => {
  let component: AccountSearchComponent;
  let fixture: ComponentFixture<AccountSearchComponent>;
  let createTaskServiceSpy: any;
  let searchedAccounts: Account[];

  beforeEach(async(() => {
    searchedAccounts = [
      {
        accountNumber: 1000,
        name: 'Account 1000',
        marketValue: 0,
        branchName: '',
        branchCode: 0,
        revTrackingDescription: '',
        revTrackingCode: 0,
        administrator: '',
        administratorCode: 0,
        seniorAdministrator: '',
        seniorAdministratorCode: 0,
        backupAdministrator: '',
        backupAdministratorCode: 0,
        investmentManager: '',
        investmentManagerCode: 0,
        backupInvestmentManager: '',
        backupInvestmentManagerCode: 0,
        bankCapacity: '',
        controlGroup: '',
      },
      {
        accountNumber: 1001,
        name: 'Account 1001',
        marketValue: 0,
        branchName: '',
        branchCode: 0,
        revTrackingDescription: '',
        revTrackingCode: 0,
        administrator: '',
        administratorCode: 0,
        seniorAdministrator: '',
        seniorAdministratorCode: 0,
        backupAdministrator: '',
        backupAdministratorCode: 0,
        investmentManager: '',
        investmentManagerCode: 0,
        backupInvestmentManager: '',
        backupInvestmentManagerCode: 0,
        bankCapacity: '',
        controlGroup: '',
      },
      {
        accountNumber: 1003,
        name: 'Account 1000',
        marketValue: 0,
        branchName: '',
        branchCode: 0,
        revTrackingDescription: '',
        revTrackingCode: 0,
        administrator: '',
        administratorCode: 0,
        seniorAdministrator: '',
        seniorAdministratorCode: 0,
        backupAdministrator: '',
        backupAdministratorCode: 0,
        investmentManager: '',
        investmentManagerCode: 0,
        backupInvestmentManager: '',
        backupInvestmentManagerCode: 0,
        bankCapacity: '',
        controlGroup: '',
      }
    ];

    createTaskServiceSpy = jasmine.createSpyObj('CreateTaskService', ['searchAccounts']);
    createTaskServiceSpy.searchAccounts.and.returnValues(
      of(searchedAccounts),
      throwError('Account not found')
    );

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, PanelModule, TableModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [AccountSearchComponent],
      providers: [
        { provide: CreateTaskService, useValue: createTaskServiceSpy },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              data: {
                type: 'AD'
              }
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    expect(component.accountType).toEqual('AD');
    expect(component.accounts.length).toEqual(0);
  });

  it('should return list of account if account search data is valid otherwise return an error', () => {
    let searchForm = { accountNumber: 10001, accountName: undefined };
    component.search(searchForm);
    expect(component.createTaskService.searchAccounts).toHaveBeenCalledWith(searchForm);

    searchForm = { accountNumber: undefined, accountName: 'null' };
    component.search(searchForm);
    expect(component.createTaskService.searchAccounts).toHaveBeenCalledWith(searchForm);
  });
});
