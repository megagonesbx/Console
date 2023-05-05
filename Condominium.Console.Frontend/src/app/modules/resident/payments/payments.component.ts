import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { PaymentDialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { ResidentsService } from 'app/modules/admin/residents/residents.service';
import { IResident } from 'app/interfaces';
import { PaymentService } from './payment.service';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  @ViewChild('residenceSelect') mySelect;

  public residents$: Observable<IResident[]>;
  private _unsubscribeAll: Subject<null> = new Subject();
  public searchInputControl: FormControl = new FormControl();

  constructor(
    private dialog: MatDialog,
    private _residentService: ResidentsService,
    private _userService: UserService,
    private _paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.getResidences();
  }

  async getResidences() {
    try {
      const user = await this._userService.user$.pipe(take(1)).toPromise();
      const { data } = await this._residentService.getHousesByUser(user?.email).pipe(take(1)).toPromise();
      this.residents$ = this._residentService.residents$;
      this.searchInputControl.patchValue(data[0].ownerDPI);
      this._paymentService.onListenDPI.next(data[0].ownerDPI);
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

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };

}
