import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import consents from '../../assets/mock/consents.json';

@Injectable({ providedIn: 'root' })
export class ConsentFlowHttpInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET' && request.url.indexOf('consents')) {
      return of(new HttpResponse({ status: 200, body: consents }));
    }
    if (request.method === 'POST' && request.url.indexOf('consents')) {
      return of(new HttpResponse({ status: 201, body: request.body }));
    }
    return next.handle(request);
  }
}
