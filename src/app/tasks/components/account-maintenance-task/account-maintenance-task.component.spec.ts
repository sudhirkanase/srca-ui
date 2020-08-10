import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMaintenanceTaskComponent } from './account-maintenance-task.component';

describe('AccountMaintenanceTaskComponent', () => {
  let component: AccountMaintenanceTaskComponent;
  let fixture: ComponentFixture<AccountMaintenanceTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMaintenanceTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMaintenanceTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
