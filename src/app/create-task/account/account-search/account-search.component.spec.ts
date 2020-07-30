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
import { By } from '@angular/platform-browser';

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

  it('should show validation error if input is less than 3 characters', () => {
    const acctNumberInput: HTMLInputElement = fixture.debugElement.query(By.css('input[formControlName=accountNumber]')).nativeElement;

    acctNumberInput.value = '12';
    acctNumberInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    acctNumberInput.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    const errorMessageDiv: HTMLDivElement = fixture.nativeElement.querySelector('div.error-class');
    expect(errorMessageDiv).toBeDefined();
    expect(errorMessageDiv.textContent).toEqual(' * Please enter at least three letters ');
  });

  it('should show validation error if input is less than 3 characters', () => {
    const acctNumberInput: HTMLInputElement = fixture.debugElement.query(By.css('input[formControlName=accountNumber]')).nativeElement;
    const acctNameInput: HTMLInputElement = fixture.debugElement.query(By.css('input[formControlName=accountName]')).nativeElement;

    acctNumberInput.dispatchEvent(new Event('focus', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    acctNumberInput.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    acctNameInput.dispatchEvent(new Event('focus', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    acctNameInput.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    const errorMessageDiv: HTMLDivElement = fixture.nativeElement.querySelector('div.error-class');
    expect(errorMessageDiv).toBeDefined();
    expect(errorMessageDiv.textContent).toEqual(' * At least one field is required ');
  });

  it('should make the search button disabled on landing on the search page', () => {
    fixture.detectChanges();
    const searchBtn: HTMLButtonElement = fixture.nativeElement.querySelector('button[type=submit]');
    expect(searchBtn.disabled).toBeTruthy();
  });

  it('should search accounts on valid input', () => {
    createTaskServiceSpy.searchAccounts.and.returnValue(of(searchedAccounts));
    const searchForm = { accountNumber: '1001', accountName: undefined };
    const acctNumberInput: HTMLInputElement = fixture.debugElement.query(By.css('input[formControlName=accountNumber]')).nativeElement;

    acctNumberInput.value = '1001';
    acctNumberInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));

    fixture.detectChanges();

    const searchBtnEl: HTMLButtonElement = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    expect(searchBtnEl.disabled).toBeFalsy();

    searchBtnEl.click();
    expect(component.createTaskService.searchAccounts).toHaveBeenCalledWith(searchForm);

    fixture.detectChanges();

    const tableRowsEl: HTMLTableRowElement[] = fixture.nativeElement.querySelectorAll('tbody > tr');
    expect(tableRowsEl.length).toBe(3);

  });

  it('should show no accounts message if accounts not found', () => {
    createTaskServiceSpy.searchAccounts.and.returnValue(throwError('Account not found'));

    const searchForm = { accountNumber: '-1234', accountName: undefined };
    const acctNumberInput: HTMLInputElement = fixture.debugElement.query(By.css('input[formControlName=accountNumber]')).nativeElement;

    acctNumberInput.value = '-1234';
    acctNumberInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));

    fixture.detectChanges();

    const searchBtnEl: HTMLButtonElement = fixture.debugElement.query(By.css('button[type=submit]')).nativeElement;
    expect(searchBtnEl.disabled).toBeFalsy();

    searchBtnEl.click();
    expect(component.createTaskService.searchAccounts).toHaveBeenCalledWith(searchForm);

    fixture.detectChanges();

    const tableRowsEl: HTMLTableRowElement[] = fixture.nativeElement.querySelectorAll('tbody > tr');
    expect(tableRowsEl.length).toBe(0);

    const errorMessageEl: HTMLDivElement = fixture.nativeElement.querySelector('.message-align');
    expect(errorMessageEl.textContent).toBe('Account not found');
  });

});
