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
  dataStart: number;
  dataMaxLength: number;

  constructor(
    private globalSettingsService: GlobalSettingsService,
    private http: HttpClient
  ) { }

  setAmountOfData(Start: number, Length: number) {
    this.dataStart = Start;
    this.dataMaxLength = Length;
  }

  getAll() {
    const data = `Start=${this.dataStart}&Length=${this.dataMaxLength}`;
    return this.http.get<CustomersRespond>(`${this.rootUrl}GetAll?${data}`);
  }

  search(txt: string) {
    if (!txt) {
      return this.getAll();
    }
    const data = `Txt=${txt}&Start=${this.dataStart}&Length=${this.dataMaxLength}`;
    return this.http.get<CustomersRespond>(`${this.rootUrl}Search?${data}`);
  }
}
