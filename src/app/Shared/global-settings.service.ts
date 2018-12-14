import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingsService {

  readonly rootUrl = 'http://localhost:35257/';
  constructor() { }
}
