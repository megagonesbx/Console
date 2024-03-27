import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportsService } from '../reports.service';
import { SnackBarService } from 'app/utils';
import { IReport } from 'app/interfaces';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [`
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
export class ReportDialogComponent implements OnInit {

  public isNew: boolean = true;
  public form: FormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  public showImage: boolean = false;
  public noImageChanged: boolean;
  public base64Image: string | undefined;
  public invalidExtention: boolean = false;
  public invalidSize: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ReportDialogComponent>,
    private _reportService: ReportsService,
    private _snackBarService: SnackBarService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();

    if (this.data?.report) {
      this.isNew = false;
      this.setForm(this.data?.report)
    }
  }

  initForm() {
    this.isNew = true;
    this.form = this._formBuilder.group({
      id: [],
      incidentName: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  };

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
    };
  };

  createReport() {
    if (this.form.invalid || this.invalidExtention || this.invalidSize) return Object.values(this.form.controls).forEach(c => c.markAsTouched());

    this._reportService.createReport(this.form.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {

      if (res == 200) {
        this.onClose();
        return this._snackBarService.open('El reporte se ha registrado exitósamente.');
      }

      this.onClose();
      return this._snackBarService.open('Ha ocurrido un error al registrar el reporte.');
    });
  };

  updateReport() {
    if (this.form.invalid) return Object.values(this.form.controls).forEach(c => c.markAsTouched());

    this._reportService.updateReport(this.form.value).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {

      if (res == 200) {
        this.onClose();
        return this._snackBarService.open('Se ha actualizado el reporte.');
      }

      this.onClose();
      return this._snackBarService.open('Ha ocurrido un error al actualizar el reporte');
    });
  };

  onlyPositiveNumbers(event: any) {
    const inputValue = event.target.value + event.key;
    if (isNaN(inputValue) || Number(inputValue) <= 0) {
      event.preventDefault();
    }
  }

  setForm(report: IReport) {
    this.noImageChanged = true;

    this.form.patchValue({
      id: report.id,
      incidentName: report.incidentName,
      description: report.description
    });

    if (report?.incidentEvidence) {
      this.base64Image = report?.incidentEvidence;
    }
  };

  onClose() {
    this.dialogRef.close();
  };

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {

      // Size Filter Bytes
      const max_size = 2000000;
      const allowed_types = ["image/png", "image/jpeg", "image/jpg"];

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
        this.invalidSize = false;
        this.invalidExtention = false;
        this.base64Image = e.target.result;
        this.form.addControl('incidentEvidence', this._formBuilder.control(this.base64Image));
        this.noImageChanged = false;
        this._changeDetectorRef.markForCheck();
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  ngAfterViewChecked(): void {
    this._changeDetectorRef.detectChanges();
  };
}
