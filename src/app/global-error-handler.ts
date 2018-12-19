import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() { }

  handleError(error: any) {
    // throw error;
    try {
      const isHttpErrorResponse = (error.rejection.name === 'HttpErrorResponse');

      if (!isHttpErrorResponse) {
        throw error;
      }
    } catch (c) {
      throw error;
    }
  }
}
