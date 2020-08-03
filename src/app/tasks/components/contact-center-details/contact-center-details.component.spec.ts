import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCenterDetailsComponent } from './contact-center-details.component';

describe('ContactCenterDetailsComponent', () => {
  let component: ContactCenterDetailsComponent;
  let fixture: ComponentFixture<ContactCenterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactCenterDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCenterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
