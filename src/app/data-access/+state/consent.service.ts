import { inject, Injectable } from '@angular/core';
import { Consent } from '../model/consent';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly httpClient = inject(HttpClient);

  loadConsents(): Observable<Consent[]> {
    return this.httpClient.get<Consent[]>('/consents');
  }

  addConsent(consent: Consent): Observable<Consent> {
    return this.httpClient.post<Consent>('/consents', consent);
  }
}
