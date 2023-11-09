import { inject, Injectable } from '@angular/core';
import { Consent } from '../model/consent';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataWithPagination, QueryPage } from '../model/table';
import { toQueryString } from '../../utils/consent.utils';

@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly httpClient = inject(HttpClient);

  loadConsents(query: QueryPage): Observable<DataWithPagination<Consent>> {
    const queryString = toQueryString(query);
    const url = queryString ? `/consents?${queryString}` : '/consents';
    return this.httpClient.get<DataWithPagination<Consent>>(url);
  }

  addConsent(consent: Consent): Observable<Consent> {
    return this.httpClient.post<Consent>('/consents', consent);
  }
}
