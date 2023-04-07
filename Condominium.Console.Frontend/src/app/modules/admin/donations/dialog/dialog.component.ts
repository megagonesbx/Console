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
      donationPhoto: [, [Validators.required]],
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
      donationPhoto: donation.donationPhoto,
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
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      // VALIDATE EXTENTION
      if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
        this.invalidExtention = true;
        return;
      };
  
      // VALIDATE SIZE
      if (file.size > 7 * 1024 * 1024) {
        this.invalidSize = true;
        return;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.base64Image = reader.result as string;
        this.form.patchValue({
          donationPhoto: reader.result as string
        });

        this._changeDetectorRef.markForCheck();

        console.log(this.form.value);
      };
    }
  };
};