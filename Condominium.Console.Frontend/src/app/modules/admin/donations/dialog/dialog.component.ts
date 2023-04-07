import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DonationsService } from '../donations.service';
import { SnackBarService } from 'app/utils';
import { IDonation } from 'app/interfaces';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [`
    .mat-form-field {
      display: grid !important;
      width: 100%;
      margin-bottom: 10px;
    }
  `]
})
export class DonationDialogComponent implements OnInit {

  public base64Image: string | undefined;
  public invalidExtention: boolean = false;
  public invalidSize: boolean = false;
  public isNew: boolean = true;
  public form: FormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DonationDialogComponent>,
    private _donationService: DonationsService,
    private _snackBarService: SnackBarService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();

    if (this?.data?.donation) {
      this.isNew = false;
      this.setForm(this?.data?.donation);
    }
  };

  initForm() {
    this.isNew = true;
    this.form = this._formBuilder.group({
      id: [],
      quantity: ['', [Validators.required]],
      description: ['', [Validators.required]],
      utilization: ['', [Validators.required]]
    });
  };

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
    };
  };

  setForm(donation: IDonation) {
    this.form.patchValue({
      id: donation.id,
      quantity: donation.quantity,
      description: donation.description,
      utilization: donation.utilization,
    });
  };

  createDonation() {
    if (this.form.invalid || this.invalidExtention || this.invalidSize) return Object.values(this.form.controls).forEach(c => c.markAsTouched());

    this._donationService.createDonation(this.form.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {

      if (res == 200) {
        this.onClose();
        return this._snackBarService.open('La donación se ha registrado exitósamente.');
      }

      this.onClose();
      return this._snackBarService.open('Ha ocurrido un error al registrar la donación.');
    });
  };

  updateDonation() {
    if (this.form.invalid) return Object.values(this.form.controls).forEach(c => c.markAsTouched());

    this._donationService.updateDonation(this.form.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {

      if (res == 200) {
        this.onClose();
        return this._snackBarService.open('Se ha actualizado el donativo.');
      }

      this.onClose();
      return this._snackBarService.open('Ha ocurrido un error al actualizar el donativo');
    });
  };

  onClose() {
    this.dialogRef.close();
  };

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {

      // Size Filter Bytes
      const max_size = 2000000;
      const allowed_types = ["image/png", "image/jpeg"];

      if (event.target.files[0].size > max_size) {
        this.invalidSize = true;
        return;
      }

      if (!allowed_types.includes(event.target.files[0].type)) {
        this.invalidExtention = true;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result;
        this.form.addControl('donationPhoto', this._formBuilder.control(this.base64Image, [Validators.required]));
        this._changeDetectorRef.markForCheck();
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };
};