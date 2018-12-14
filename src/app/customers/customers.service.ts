import { Injectable } from '@angular/core';
import { GlobalSettingsService } from '../Shared/global-settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private rootUrl = this.globalSettingsService.rootUrl + 'api/Customers/';
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });

  constructor(
    private globalSettingsService: GlobalSettingsService,
    private http: HttpClient,
    private appService: AppService,
  ) { }

  getAll() {
    const res = this.http.get(`${this.rootUrl}GetAll?Start=10&Length=5`)
      .subscribe((dataRes) => {
        console.log(dataRes);
      },
        err => {
        }
      );
  }
}
