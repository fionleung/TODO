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

//could have multipl interceptors
// import {Injectable} from '@angular/core';
// import {
//   HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
// } from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
// import {Router} from '@angular/router';
// import 'rxjs/add/operator/catch';
// import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

// @Injectable()
// export class NotFoundInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {
//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     return next.handle(req)
//       .catch((response: HttpErrorResponse) => {
//         if (response.status === 404) {
//           this.router.navigate('/your-404-route');
//         }

//         return ErrorObservable.create(response);
//       });
//   }
// }