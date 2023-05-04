import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { PaymentService } from '../payment.service';
import { SnackBarService } from 'app/utils';
import { IPayment, IResident } from 'app/interfaces';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  public _residents$: IResident[];
  public months: { description: string; value: number; }[] = [];

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
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    private _paymentService: PaymentService,
    private _snackBarService: SnackBarService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getMoths();

    if (this.data?.payment) {
      this.isNew = false;
      this.setForm(this.data.payment);
    }

  }

  initForm() {
    this.isNew = true;
    this.form = this._formBuilder.group({
      id: [],
      ownerDPI: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      month: ['', [Validators.required]],
      description: ['', [Validators.required]],
      photo: [''],
      payedAt: ['']
    });
  };

  setForm(payment: IPayment) {
    this.noImageChanged = true;

    this.form.patchValue({
      id: payment.id,
      ownerDPI: payment.ownerDPI,
      amount: payment.amount,
      month: payment.month,
      description: payment.description,
      payedAt: payment.payedAt,
    });

    if (payment?.photo) {
      this.base64Image = payment?.photo;
    }
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
  };

  getMoths() {
    this.months = this._paymentService.getMonths();
  }

  onClose() {
    this.dialogRef.close();
  };
};