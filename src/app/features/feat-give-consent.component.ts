import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { JsonPipe, NgIf } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ConsentFacade } from '../data-access/+state/consent.facade';
import { Consent } from '../data-access/model/consent';

@Component({
  standalone: true,
  selector: 'consent-flow-give-consent',
  template: `
    <form class="flex flex-col w-full justify-center items-center gap-5" [formGroup]="formGroup">
      <section class="xs:flex-col inline-flex w-full gap-3 justify-center items-center">
        <mat-form-field class="w-2/4">
          <mat-label>Name</mat-label>
          <input type="text" matInput [attr.data-cy]="'inputName'" [formControl]="nameControl" placeholder="Name" />
          <mat-error *ngIf="nameControl.hasError('required')"> Name is required</mat-error>
        </mat-form-field>
        <mat-form-field class="w-2/4">
          <mat-label>Email address</mat-label>
          <input
            type="email"
            [attr.data-cy]="'inputEmail'"
            matInput
            [formControl]="emailControl"
            placeholder="Email address" />
          <mat-error *ngIf="emailControl.hasError('required')"> Email is required</mat-error>
          <mat-error *ngIf="emailControl.hasError('pattern')"> pattern is required</mat-error>
          <mat-error *ngIf="emailControl.hasError('email')"> You've entered an invalid email address</mat-error>
        </mat-form-field>
      </section>
      I agree to:
      <section class="border border-1 border-gray-400 flex flex-col justify-start items-start p-3 w-8/12">
        <mat-checkbox [attr.data-cy]="'receiveNewsLetter'" [formControl]="receiveNewsletterControl"
          >Receive newsletter</mat-checkbox
        >
        <mat-checkbox [attr.data-cy]="'seeTargetAdds'" [formControl]="seeTargetAdsControl"
          >Be shown target ads</mat-checkbox
        >
        <mat-checkbox
          [attr.data-cy]="'contributeToAnonymousStatistics'"
          [formControl]="contributeToAnonymousStatisticsControl"
          >Contribute to anonymous visit statistics
        </mat-checkbox>
      </section>
      <section class="flex flex-col justify-center items-center">
        <button
          mat-raised-button
          color="primary"
          type="button"
          [attr.data-cy]="'buttonSaveConsent'"
          (click)="saveConsent()"
          [disabled]="
            !receiveNewsletterControl.value &&
            !seeTargetAdsControl.value &&
            !contributeToAnonymousStatisticsControl.value
          ">
          Give consent
        </button>
      </section>
    </form>
  `,
  imports: [ReactiveFormsModule, MatInputModule, NgIf, MatCheckboxModule, MatButtonModule, JsonPipe],
})
export class FeatGiveConsentComponent {
  nameControl = new FormControl('', Validators.required);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  receiveNewsletterControl = new FormControl(false);
  seeTargetAdsControl = new FormControl(false);
  contributeToAnonymousStatisticsControl = new FormControl(false);
  formGroup = new FormGroup({
    name: this.nameControl,
    email: this.emailControl,
    seeTargetAds: this.seeTargetAdsControl,
    receiveNewsletter: this.receiveNewsletterControl,
    contributeToAnonymousStatistics: this.contributeToAnonymousStatisticsControl,
  });
  private readonly consentFacade = inject(ConsentFacade);
  saveConsent() {
    if (this.formGroup.valid) {
      this.consentFacade.addConsent(this.formGroup.value as Consent);
      this.formGroup.reset();
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
