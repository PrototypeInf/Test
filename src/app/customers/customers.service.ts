import { Injectable } from '@angular/core';
import { GlobalSettingsService } from '../Shared/global-settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customers, CustomersRespond } from './customers.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private rootUrl = this.globalSettingsService.rootUrl + 'api/Customers/';
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });

  constructor(
    private globalSettingsService: GlobalSettingsService,
    private http: HttpClient
  ) { }

  getAll(Start, Length) {
    const data = `Start=${Start}&Length=${Length}`;
    return this.http.get<CustomersRespond>(`${this.rootUrl}GetAll?${data}`);
  }
}
