import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { GlobalSettingsService } from '../Shared/global-settings.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private rootUrl = this.globalSettingsService.rootUrl;
  private _isAuterized = false;
  get isAuterized() { return this._isAuterized; }

  constructor(
    private http: HttpClient,
    private globalSettingsService: GlobalSettingsService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  registerUser(user: User) {
    const body: User = {
      Password: user.Password,
      Email: user.Email,
      Location: user.Location,
      Name: user.Name
    };
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    const res = this.http.post(`${this.rootUrl}api/User/Register`, body, { headers: reqHeader })
      .pipe(
        map((httpRes: any) => {
          if (httpRes.Succeeded === true) {
            this.toastrService.success('Registered');
          } else {
            this.toastrService.error('Registering failed');
          }
          return httpRes;
        }),
        catchError(err => {
          this.toastrService.error('Registering failed');
          return throwError(err);
        })
      );
    return res;
  }

  userAuthentication(email, password) {
    const data = `username=${email}&password=${password}&grant_type=password`;
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    const res = this.http.post(`${this.rootUrl}token`, data, { headers: reqHeader })
      .pipe(
        map((httpRes: any) => {
          this.signIn(httpRes.access_token);
          this.router.navigate(['/']);
          return httpRes;
        }),
        catchError(err => {
          this.loggOff();
          this.toastrService.error('Could not sign in');
          return throwError(err);
        })
      );
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

  tryLogIn() {
    if (localStorage.getItem('userToken')) {
      this._isAuterized = true;
    }
  }

  getUserClaims() {
    return this.http.get(`${this.rootUrl}api/GetUserClaims`);
  }
}
