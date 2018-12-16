import { Injectable } from '@angular/core';
import { GlobalSettingsService } from '../Shared/global-settings.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from './order.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private rootUrl = this.globalSettingsService.rootUrl + 'api/Orders/';
  private headersNoAuth: HttpHeaders;
  private headersPostAuth: HttpHeaders;


  constructor(
    private globalSettingsService: GlobalSettingsService,
    private http: HttpClient,
    private toastrService: ToastrService
  ) {
    this.headersNoAuth = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    this.headersPostAuth = new HttpHeaders({ 'Content-Type': 'application/json' });
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

