import { Injectable } from '@angular/core';
import { GlobalSettingsService } from '../Shared/global-settings.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface CustomerOrdersRespond {
  CustomersId: number;
  CustomersName: string;
  OrdersCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private rootUrl = this.globalSettingsService.rootUrl + 'api/Statistics/';
  private dataMaxCount: number;

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  setRange(dataMaxCount: number) {
    this.dataMaxCount = dataMaxCount;
  }

  getCustomerOrders() {
    const res = this.http.get<CustomerOrdersRespond[]>(`${this.rootUrl}CustomerOrders`)
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
}
