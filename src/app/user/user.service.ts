import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { GlobalSettingsService } from '../Shared/global-settings.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private rootUrl = this.globalSettingsService.rootUrl;
  private _isAuterized = false;
  get isAuterized() { return this._isAuterized; }

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService
    ) { }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      Location: user.Location,
      Name: user.Name
    };
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(`${this.rootUrl}api/User/Register`, body, { headers: reqHeader });
  }

  userAuthentication(email, password) {
    const data = `username=${email}&password=${password}&grant_type=password`;
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    const res = this.http.post(`${this.rootUrl}token`, data, { headers: reqHeader });
    return res;
  }

  signIn(token: string) {
    localStorage.setItem('userToken', token);
    this._isAuterized = true;
  }

  loggOff() {
    localStorage.removeItem('userToken');
    this._isAuterized = false;
  }

  getUserClaims() {
    return this.http.get(`${this.rootUrl}api/GetUserClaims`);
  }
}
