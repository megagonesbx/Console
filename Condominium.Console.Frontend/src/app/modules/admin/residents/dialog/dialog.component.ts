import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ResidentsService } from '../residents.service';
import { SnackBarService } from 'app/utils';
import { IResident } from 'app/interfaces';

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
export class ResidentDialogComponent implements OnInit, OnDestroy {

  public isNew: boolean = true;
  public form: FormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  public solventStatus: { value: boolean, description: string }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ResidentDialogComponent>,
    private _residentService: ResidentsService,
    private _snackBarService: SnackBarService
  ) {
    this.solventStatus = [
      {
        value: false,
        description: 'Insolvente'
      },
      {
        value: true,
        description: 'Solvente'
      }
    ]
  }

  ngOnInit(): void {
    this.initForm();

    if (this?.data?.house) {
      this.isNew = false;
      this.setForm(this?.data?.house);
    };
  };

  initForm() {
    this.isNew = true;
    this.form = this._formBuilder.group({
      id: [],
      homeAddress: ['', [Validators.required]],
      ownerName: ['', [Validators.required]],
      ownerDPI: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      solvent: ['', [Validators.required]],
    });
  };

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
    };
  };

  setForm(house: IResident) {
    this.form.patchValue({
      id: house.id,
      homeAddress: house.homeAddress,
      ownerName: house.ownerName,
      ownerDPI: house.ownerDPI,
      phoneNumber: house.phoneNumber,
      solvent: house.solvent,
    });
  };

  createResident() {
    if (this.form.invalid) return Object.values(this.form.controls).forEach(c => c.markAsTouched());

    this._residentService.createResident(this.form.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {

      if (res == 200) {
        this.onClose();
        return this._snackBarService.open('La residencia se ha creado exitósamente.');
      }

      this.onClose();
      return this._snackBarService.open('Ha ocurrido un error al crear la residencia.');
    });
  };

  updateResident() {
    if (this.form.invalid) return Object.values(this.form.controls).forEach(c => c.markAsTouched());

    this._residentService.updateResident(this.form.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {

      if (res == 200) {
        this.onClose();
        return this._snackBarService.open('Se ha actualizado la residencia.');
      }

      this.onClose();
      return this._snackBarService.open('Ha ocurrido un error al actualizar la residencia');
    });
  };

  onClose() {
    this.dialogRef.close();
  };

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };
}