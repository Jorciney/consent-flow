import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as ConsentActions from './consent.actions';
import { ConsentService } from './consent.service';
import { Router } from '@angular/router';

@Injectable()
export class ConsentEffects {
  private actions$ = inject(Actions);
  private readonly consentService = inject(ConsentService);
  private readonly router = inject(Router);

  loadConsents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsentActions.loadConsents),
      mergeMap((action) =>
        this.consentService.loadConsents({
          start: action.query?.start || 0,
          count: action.query?.count ?? 2,
        })
      ),
      map((consentsPage) => ConsentActions.loadConsentSuccess({ consentsPage })),
      catchError((error) => {
        console.error('Error', error);
        return of(ConsentActions.loadConsentFailure({ error }));
      })
    )
  );
  addConsent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsentActions.addConsent),
      mergeMap((action) => this.consentService.addConsent(action.consent)),
      map((consent) => ConsentActions.addConsentSuccess({ consent })),
      catchError((error) => {
        console.error('Error', error);
        return of(ConsentActions.loadConsentFailure({ error }));
      })
    )
  );
  addConsentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsentActions.addConsentSuccess),
      tap((action) => this.router.navigate(['consents'])),
      map(() => ConsentActions.loadConsents({ query: { start: 0, count: 2 } }))
    )
  );
}
