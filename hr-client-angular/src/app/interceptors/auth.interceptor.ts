import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly baseUrl = 'http://localhost:3000';
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only prepend base URL for relative URLs (not absolute URLs)

    request = request.clone({
      url: `${this.baseUrl}/${request.url}`,
    });

    if (request.url.endsWith('/api/login')) {
      // If the request is to api/login, do not modify the request
      return next.handle(request);
    }

    const jwtToken = localStorage.getItem('jwtToken'); // Adjust this line as per your token storage logic

    if (jwtToken) {
      // Clone the request and add the JWT token to the headers
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      return next.handle(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // If response is 401 Unauthorized, remove the token
            localStorage.removeItem('jwtToken');
            // Optionally, redirect the user to the login page or handle the error as required
          }

          // Re-throw the error to be handled by the component or a global error handler
          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
}
