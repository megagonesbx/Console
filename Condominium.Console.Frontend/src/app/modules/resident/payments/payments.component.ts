import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { PaymentDialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { ResidentsService } from 'app/modules/admin/residents/residents.service';
import { IResident } from 'app/interfaces';
import { PaymentService } from './payment.service';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { SnackBarService } from 'app/utils';

declare const paypal;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  @ViewChild('residenceSelect') mySelect;
  @ViewChild("paypal", { static: true }) paypalElement: ElementRef;

  public residents$: Observable<IResident[]>;
  private _unsubscribeAll: Subject<null> = new Subject();
  public searchInputControl: FormControl = new FormControl();
  public homeAddress: string;
  public dpi: string;

  constructor(
    private dialog: MatDialog,
    private _residentService: ResidentsService,
    private _userService: UserService,
    private _paymentService: PaymentService,
    private _snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.getResidences();
  };

  async getResidences() {
    try {
      const user = await this._userService.user$.pipe(take(1)).toPromise();
      const { data } = await this._residentService.getHousesByUser(user?.email).pipe(take(1)).toPromise();
      this.residents$ = this._residentService.residents$;
      this.searchInputControl.patchValue(data[0].ownerDPI);
      this._paymentService.onListenDPI.next(data[0].ownerDPI);
      this.homeAddress = data[0].homeAddress;
      this.dpi = data[0].ownerDPI;

      this.initPaypal();
    } catch (error) {
      console.error('Error obteniendo residencias', error);
    }
  }

  onOptionSelection(event: MatSelectChange) {
    this._paymentService.onListenDPI.next(event.value);
  }

  openDialog() {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => this._paymentService.listenDialog());
  }

  initPaypal() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const fullMonth: string = this._paymentService.getMonths()[currentMonth - 1].description;

    let description: string = `Pago de ${this.homeAddress}: Correspondiente a ${fullMonth} ${currentYear}.`;

    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: description,
                amount: {
                  currency_code: "USD",
                  value: 800
                }
              }
            ]
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();

          if (order?.status !== "COMPLETED")
            return this._snackBarService.open("Ha ocurrido un error realizar el pago.")

          this._paymentService.createPayment({
            ownerDPI: this.dpi,
            amount: 800,
            description: description + ` ID: ${order?.id}`,
            month: JSON.stringify(currentMonth),
            payedAt: order?.update_time,
            homeAddress: this.homeAddress
          })
            .subscribe({
              next: (res) => {
                if (res == 403) {
                  return this._snackBarService.open(`Ya existe un pago registrado para esa residencia para el mes de ${fullMonth}.`);
                };

                if (res == 200) {
                  this._paymentService.listenDialog()
                  return this._snackBarService.open('Se ha registrado el pago exitósamente.');
                };

                
                return this._snackBarService.open("Ha ocurrido un error realizar el pago.")
              },
              error: (err) => {
                return this._snackBarService.open("Ha ocurrido un error realizar el pago.")
              }
            });
        },
        onError: err => {
          return this._snackBarService.open("Ha ocurrido un error realizar el pago.");
        }
      })
      .render(this.paypalElement.nativeElement);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };

}
