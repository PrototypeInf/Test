import { Injectable } from '@angular/core';
import { GlobalSettingsService } from '../Shared/global-settings.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from './order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface CustomerOrders {
  CustomersId: number;
  CustomersName: string;
  Orders: Order[];
  TotalPrice: number;
}

export interface OrdersRespond {
  Length: number;
  CustomerOrders: CustomerOrders;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private rootUrl = this.globalSettingsService.rootUrl + 'api/Orders/';
  private headersNoAuth: HttpHeaders;
  private headersPostAuth: HttpHeaders;
  private dataStart: number;
  private dataMaxLength: number;

  constructor(
    private globalSettingsService: GlobalSettingsService,
    private http: HttpClient,
    private toastrService: ToastrService
  ) {
    this.headersNoAuth = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    this.headersPostAuth = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  setAmountOfData(Start: number, Length: number) {
    this.dataStart = Start;
    this.dataMaxLength = Length;
  }

  getAll() {
    const data = `Start=${this.dataStart}&Length=${this.dataMaxLength}`;
    const res = this.http.get<OrdersRespond>(`${this.rootUrl}GetAll?${data}`)
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

  delete(orderId: number|string) {
    const data = `Id=${orderId}`;
    const res = this.http.delete<Order>(`${this.rootUrl}Delete?${data}`, { headers: this.headersPostAuth })
    .pipe(
      map((httpRes) => {
        this.toastrService.success('Order has been deleted');
        return httpRes;
      }),
      catchError(err => {
        this.toastrService.error('Order not deleted');
        return throwError(err);
      })
    );
    return res;
  }

}

