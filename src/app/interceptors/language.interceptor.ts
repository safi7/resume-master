import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Accept-Language
    // request = request.clone({ headers: request.headers.set('X-language', localStorage.getItem('language')) });

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => { },
        (err: any) => { }
      )
    );
  }
}
