import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, take } from 'rxjs';
import { PaymentService } from '../payment.service';
import { SnackBarService, transformDate } from 'app/utils';
import { IPayment, IResident } from 'app/interfaces';
import { UserService } from 'app/core/user/user.service';
import { ResidentsService } from 'app/modules/admin/residents/residents.service';
import { MatSelectChange } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  public residents$: Observable<IResident[]>;
  public months: { description: string; value: number; }[] = [];

  public isNew: boolean = true;
  public form: FormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  public showImage: boolean = false;
  public noImageChanged: boolean;
  public base64Image: string | undefined;
  public invalidExtention: boolean = false;
  public invalidSize: boolean = false;

  public homeAddress: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    private _paymentService: PaymentService,
    private _snackBarService: SnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _userService: UserService,
    private _residentService: ResidentsService
  ) { }

  ngOnInit(): void {
    this.getResidences();
    this.getMoths();
    this.initForm();

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
      payedAt: ['']
    });
  };

  setForm(payment: IPayment) {
    this.noImageChanged = true;

    this.form.patchValue({
      id: payment.id,
      ownerDPI: payment.ownerDPI,
      amount: payment.amount,
      month: parseInt(payment.month),
      description: payment.description,
      payedAt: this.convertDate(payment.payedAt)
    });

    if (payment?.photo) {
      this.base64Image = payment?.photo;
    };
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

  async getResidences() {
    try {
      const user = await this._userService.user$.pipe(take(1)).toPromise();
      await this._residentService.getHousesByUser(user?.email).pipe(take(1)).toPromise();
      this.residents$ = this._residentService.residents$;
    } catch (error) {
      console.error('Error obteniendo residencias', error);
      this.onClose();
    }
  }

  onOptionSelection(event: MatSelectChange) {
    const homeAddress = event.source.triggerValue;
    this.form.addControl('homeAddress', this._formBuilder.control(homeAddress));
  };

  registerPayment() {
    if (this.form.invalid) Object.values(this.form.controls).forEach(c => c.markAsTouched());

    this._paymentService.createPayment(this.form.value).subscribe(res => {

      if (res == 403) {
        const month = this.months.find(m => m.value == this.form.controls.month?.value).description;
        return this._snackBarService.open(`Ya existe un pago registrado para esa residencia para el mes de ${month}.`);
      }

      if (res == 200) {
        this.onClose();
        return this._snackBarService.open('Se ha registrado el pago exitósamente.');
      }

      return this._snackBarService.open('Ha ocurrido un error al registrar el pago.');
    });
  }

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
        this.form.addControl('photo', this._formBuilder.control(this.base64Image));
        this.noImageChanged = false;
        this._changeDetectorRef.markForCheck();
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  convertDate(date: string): string {
    return transformDate(date);
  };
};