import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAccountDetailsComponent } from './task-account-details.component';

describe('TaskAccountDetailsComponent', () => {
  let component: TaskAccountDetailsComponent;
  let fixture: ComponentFixture<TaskAccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskAccountDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
