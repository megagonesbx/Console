import { Component, Inject, OnDestroy, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'app/utils';
import { IResident, Ivisit } from 'app/interfaces';
import { VisitsService } from '../visits.service';
import { Observable, Subject, delay, takeUntil } from 'rxjs';
import { ResidentsService } from 'app/modules/admin/residents/residents.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [
    `
    .mat-form-field {
      display: grid !important;
      width: 100%;
      margin-bottom: 10px;
    }

    .donation-image {
      height: 100%;
      object-fit: cover;
    }

    .doc-file {
      color: white;
      text-align: center;
      font-weight: bold;
      font-style: italic;
    }
  `]
})
export class VisitorDialogComponent implements OnInit, OnDestroy, AfterViewChecked {

  public isNew: boolean = true;
  public form: FormGroup;
  public residents$: Observable<IResident[]>;
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<VisitorDialogComponent>,
    private _visitorService: VisitsService,
    private _snackBarService: SnackBarService,
    private _residentService: ResidentsService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { console.log(this.data.visitor) }

  ngOnInit(): void {
    this.initForm();
    this.getResidents();

    if (this?.data?.visitor) {
      this.isNew = false;
      this.setForm(this?.data?.visitor);
    };
  }

  initForm() {
    this.isNew = true;
    this.form = this._formBuilder.group({
      id: [],
      name: ['', [Validators.required]],
      dpi: ['', [Validators.required]],
      homeAddress: [, [Validators.required]],
      createdAt: ['']
    });
  };

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
    };
  };

  onlyPositiveNumbers(event: any) {
    const inputValue = event.target.value + event.key;
    if (isNaN(inputValue) || Number(inputValue) <= 0) {
      event.preventDefault();
    }
  }

  onClose() {
    this.dialogRef.close();
  };

  setForm(visitor: Ivisit) {
    this.form.patchValue({
      id: visitor.id,
      name: visitor.name,
      dpi: visitor.dpi,
      homeAddress: visitor.homeAddress,
      createdAt: visitor.createdAt,
    });
  };

  getResidents(dpi?: string, page: number = 1, pageSize: number = 100) {
    this._residentService.getResidents({ dpi, page, pageSize }).pipe(delay(500), takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.residents$ = this._residentService.residents$;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  createVisitor() {
    if (this.form.invalid) return Object.values(this.form.controls).forEach(c => c.markAsTouched());

    this._visitorService.createVisit(this.form.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {

      if (res == 200) {
        this.onClose();
        return this._snackBarService.open('El vistante se ha registrado exitósamente.');
      }

      this.onClose();
      return this._snackBarService.open('Ha ocurrido un error al registrar al vistante.');
    });
  };

  updateVisitor() {
    if (this.form.invalid) return Object.values(this.form.controls).forEach(c => c.markAsTouched());

    this._visitorService.updateVisit(this.form.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {

      if (res == 200) {
        this.onClose();
        return this._snackBarService.open('Se ha actualizado al visitante.');
      }

      this.onClose();
      return this._snackBarService.open('Ha ocurrido un error al actualizar al visitante');
    });
  };
}
