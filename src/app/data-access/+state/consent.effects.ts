import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as ConsentActions from './consent.actions';
import * as ConsentFeature from './consent.reducer';

@Injectable()
export class ConsentEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConsentActions.initConsent),
      switchMap(() => of(ConsentActions.loadConsentSuccess({ consent: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(ConsentActions.loadConsentFailure({ error }));
      })
    )
  );
}
