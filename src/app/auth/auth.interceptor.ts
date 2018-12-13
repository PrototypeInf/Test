import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq);
        }
        return next.handle(req);
    }
}
