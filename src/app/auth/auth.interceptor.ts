import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppService } from '../app.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private appService: AppService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.appService.loading = true;
        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq)
                .pipe(tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.appService.loading = false;
                    }
                },
                    (err: any) => {
                        this.appService.loading = false;
                    }));
        }
        return next.handle(req)
            .pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.appService.loading = false;
                }
            },
                (err: any) => {
                    this.appService.loading = false;
                }));
    }
}
