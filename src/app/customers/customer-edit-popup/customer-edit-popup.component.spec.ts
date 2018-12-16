import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditPopupComponent } from './customer-edit-popup.component';

describe('CustomerEditPopupComponent', () => {
  let component: CustomerEditPopupComponent;
  let fixture: ComponentFixture<CustomerEditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
