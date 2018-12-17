import { Injectable } from '@angular/core';
import { GlobalSettingsService } from '../Shared/global-settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer, CustomersRespond } from './customers.model';
import { ToastrService } from 'ngx-toastr';

import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Order } from '../order/order.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private rootUrl = this.globalSettingsService.rootUrl + 'api/Customers/';
  private reqHeaderNoAuth: HttpHeaders;
  private reqHeaderPostAuth: HttpHeaders;
  private dataStart: number;
  private dataMaxLength: number;

  constructor(
    private globalSettingsService: GlobalSettingsService,
    private http: HttpClient,
    private toastrService: ToastrService
  ) {
    this.reqHeaderNoAuth = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    this.reqHeaderPostAuth = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  setAmountOfData(Start: number, Length: number) {
    this.dataStart = Start;
    this.dataMaxLength = Length;
  }

  edit(customer: Customer) {
    const res = this.http.put<Customer>(`${this.rootUrl}Edit`, customer, { headers: this.reqHeaderPostAuth })
      .pipe(
        map((httpRes) => {
          this.toastrService.success('Customer has been changed');
          return httpRes;
        }),
        catchError(err => {
          this.toastrService.error('Customer not changed');
          return throwError(err);
        })
      );
    return res;
  }

  get(customerId) {
    const data = `Id=${customerId}`;
    const res = this.http.get<Customer>(`${this.rootUrl}Get?${data}`)
      .pipe(
        map((httpRes) => {
          return httpRes;
        }),
        catchError(err => {
          this.toastrService.error('Server error');
          return throwError(err);
        })
      );
    return res;
  }

  delete(customerId: number | string) {
    const data = `Id=${customerId}`;
    const res = this.http.delete(`${this.rootUrl}Delete?${data}`, { headers: this.reqHeaderPostAuth })
      .pipe(
        map((httpRes) => {
          this.toastrService.success('Customer has been deleted');
          return httpRes;
        }),
        catchError(err => {
          this.toastrService.error('Customer not deleted');
          return throwError(err);
        })
      );
    return res;
  }

  add(customer: Customer) {
    const res = this.http.post<Customer>(`${this.rootUrl}AddCustomer`, customer, { headers: this.reqHeaderPostAuth })
      .pipe(
        map((httpRes) => {
          this.toastrService.success('Customer has been added');
          return httpRes;
        }),
        catchError(err => {
          this.toastrService.error('Customer not added');
          return throwError(err);
        })
      );
    return res;
  }

  getAll() {
    const data = `Start=${this.dataStart}&Length=${this.dataMaxLength}`;
    const res = this.http.get<CustomersRespond>(`${this.rootUrl}GetAll?${data}`)
      .pipe(
        map((httpRes) => {
          return httpRes;
        }),
        catchError(err => {
          this.toastrService.error('Server error');
          return throwError(err);
        })
      );
    return res;
  }

  search(txt: string) {
    if (!txt) {
      return this.getAll();
    }
    const data = `Txt=${txt}&Start=${this.dataStart}&Length=${this.dataMaxLength}`;
    return this.http.get<CustomersRespond>(`${this.rootUrl}Search?${data}`);
  }

  getOrderList(CustomerId: number | string) {
    const data = `CustomerId=${CustomerId}&Start=${this.dataStart}&Length=${this.dataMaxLength}`;
    const res = this.http.get<any>(`${this.rootUrl}GetOrdersList?${data}`)
      .pipe(
        map((httpRes) => {
          return httpRes;
        }),
        catchError(err => {
          this.toastrService.error('Server error');
          return throwError(err);
        })
      );
    return res;
  }

  setCustomerOrder(order: Order) {
    const res = this.http.post<Order>(`${this.rootUrl}AddCustomerOrder`, order, { headers: this.reqHeaderPostAuth })
      .pipe(
        map((httpRes) => {
          this.toastrService.success('Order has been added');
          return httpRes;
        }),
        catchError(err => {
          this.toastrService.error('Order not added');
          return throwError(err);
        })
      );
    return res;
  }
}
