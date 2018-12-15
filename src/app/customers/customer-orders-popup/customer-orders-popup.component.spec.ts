import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrdersPopupComponent } from './customer-orders-popup.component';

describe('CustomerOrdersPopupComponent', () => {
  let component: CustomerOrdersPopupComponent;
  let fixture: ComponentFixture<CustomerOrdersPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrdersPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrdersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
