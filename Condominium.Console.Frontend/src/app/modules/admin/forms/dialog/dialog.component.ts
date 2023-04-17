import { Component, OnDestroy, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMonth, ISpreadsheet } from 'app/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../users/user.service';
import { SnackBarService, dpiValidator } from 'app/utils';
import { SpreadsheetService } from '../spreadsheet.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
export class SpreadsheetDialogComponent implements OnInit, OnDestroy {

  public isNew: boolean = true;
  public form: FormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  public months: IMonth[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SpreadsheetDialogComponent>,
    private _spreadsheetService: SpreadsheetService,
    private _snackBarService: SnackBarService,
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { 
    this.months = this._spreadsheetService.getMonths();
  }

  ngOnInit(): void {
    this.initForm();

    if (this?.data?.spreadsheet) {
      this.isNew = false;
      this.setForm(this?.data?.spreadsheet);
    }
  }

  initForm() {
    this.isNew = true;
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      dpi: ['', [Validators.required, dpiValidator]],
      paymentMonth: [1, Validators.required],
      Id: [],
      CreatedAt: []
    });
  };

  setForm(spreadsheet: ISpreadsheet) {
    this.form.patchValue({
      name: spreadsheet.name,
      dpi: spreadsheet.dpi,
      paymentMonth: spreadsheet.paymentMonth,
      Id: spreadsheet.id,
      CreatedAt: spreadsheet.createdAt
    });
  };

  validateNumberInput(event: KeyboardEvent): void {
    const key = event.key;

    if (isNaN(Number(key)) && key !== '.' && key !== ',' && key !== '-') {
      event.preventDefault();
    }

    if (key === 'Enter') {
      event.preventDefault();
    }
  }

  onClose() {
    this.dialogRef.close();
  };

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  createSpreadsheet() {
    if (this.form.invalid) return Object.values(this.form.controls).forEach(c => c.markAsTouched());

    this._spreadsheetService.createSpreadsheet(this.form.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (res == 200) {
        this.onClose();
        return this._snackBarService.open('El pago se ha registrado exitósamente.');
      }

      this.onClose();
      return this._snackBarService.open('Ha ocurrido un error al registrar el pago.');
    })
  }
}