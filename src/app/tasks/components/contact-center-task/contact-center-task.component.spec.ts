import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCenterTaskComponent } from './contact-center-task.component';

describe('ContactCenterTaskComponent', () => {
  let component: ContactCenterTaskComponent;
  let fixture: ComponentFixture<ContactCenterTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactCenterTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCenterTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
