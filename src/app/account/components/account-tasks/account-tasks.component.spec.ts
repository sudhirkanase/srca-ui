import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTasksComponent } from './account-tasks.component';

describe('AccountTasksComponent', () => {
  let component: AccountTasksComponent;
  let fixture: ComponentFixture<AccountTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
