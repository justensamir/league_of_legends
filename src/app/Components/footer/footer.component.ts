import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-footer',
  template: `
    <form [formGroup]="phoneForm">
      <input type="tel" class="form-control intl-tel-input" formControlName="phone" />
      <div *ngIf="phoneForm.get('phone').invalid && phoneForm.get('phone').touched">
        <div *ngIf="phoneForm.get('phone').errors.required">Phone number is required.</div>
        <div *ngIf="phoneForm.get('phone').errors.pattern">Invalid phone number.</div>
      </div>
    </form>
  `,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
  phoneForm = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)])
  });

  @ViewChild('phoneInput', { static: true })
  phoneInput!: ElementRef;
  // phoneForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngAfterViewInit() {
    const phoneInput = this.phoneInput.nativeElement;
    const iti = intlTelInput(phoneInput, { initialCountry: 'us' }); // set initial country as US

    phoneInput.addEventListener('countrychange', () => {
      const dialCode = iti.getSelectedCountryData().dialCode;
      this.phoneForm.controls.phone.setValidators([Validators.required, Validators.pattern(new RegExp(`^\\${dialCode}\\d{6,14}$`))]);
      this.phoneForm.controls.phone.updateValueAndValidity();
    });
  }
}
