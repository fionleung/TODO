import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const authToken = localStorage.getItem('TodoToken');
        request = request.clone({
            setHeaders: {
                    Authorization: `${authToken}`
              }
          });
       
        return next.handle(request);
    }
}