import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import consents from '../../assets/mock/consents.json';
import { getQueryParams } from '../utils/consent.utils';
import { Consent } from './model/consent';

@Injectable({ providedIn: 'root' })
export class ConsentFlowHttpInterceptor implements HttpInterceptor {
  newConsents: Consent[] = [];
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET' && request.url.indexOf('consents')) {
      const queryParams = getQueryParams(request.url);
      const start = +queryParams['start'];
      const count = +queryParams['count'];
      const allConsents = [...consents, ...this.newConsents];
      const consentsResponse = {
        data: allConsents.slice(start, start + count),
        start,
        count,
        size: allConsents.length,
      };
      return of(new HttpResponse({ status: 200, body: consentsResponse }));
    }
    if (request.method === 'POST' && request.url.indexOf('consents')) {
      this.newConsents.push(request.body);
      return of(new HttpResponse({ status: 201, body: request.body }));
    }
    return next.handle(request);
  }
}
