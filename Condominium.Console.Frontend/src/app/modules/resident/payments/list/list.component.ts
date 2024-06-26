import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject, map, merge, switchMap, take, takeUntil } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService, transformDate } from 'app/utils';
import { PaymentService } from '../payment.service';
import { IPayment, IResident } from 'app/interfaces';
import { UserService } from 'app/core/user/user.service';
import { PaymentDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'payment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject();
  @ViewChild(MatPaginator) public _paginator: MatPaginator;
  @ViewChild(MatSort) public _sort: MatSort;

  public payments$: Observable<IPayment[]>;
  public payments: IPayment[] = [];
  public loading: boolean;

  // MAT PAGINATOR
  public pageSize: number = 10;
  public page: number = 1;
  public count: number = 0;
  public pages: number = 0;
  public pageSizeOptions: number[] = [10, 15, 25];

  public dpi: string;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private _paymentService: PaymentService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.onChangeResidence();
    this.onListenDialog();
  }

  ngAfterViewInit(): void {
    if (this._sort && this._paginator) {

      this._sort.sort({
        id: 'id',
        start: 'asc',
        disableClear: true
      });

      this._changeDetectorRef.markForCheck();

      merge(this._sort.sortChange, this._paginator.page).pipe(
        switchMap(() => {
          this.loading = true;
          this.pageSize = this._paginator.pageSize

          return this._paymentService.getPayments({ dpi: this.dpi, page: this.page, pageSize: this.pageSize })
        }),
        map(() => this.loading = false)
      ).pipe(takeUntil(this._unsubscribeAll)).subscribe();
    };
  };

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };

  async getPayments(dpi: string, page: number = 1, pageSize: number = 10) {
    try {
      this.loading = true;
      this._paymentService.getPayments({ page, pageSize, dpi }).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
        this.payments$ = this._paymentService.payments$;
        this.payments = res.payments;
        this.page = res.page;
        this.count = res.total;
        this.pages = res.pages;
        this.loading = false
        this._changeDetectorRef.markForCheck();
      });

    } catch (error) {
      console.log(error);
    }
  };

  async onChangeResidence() {
    this._paymentService.dpi$.subscribe(res => {
      this.getPayments(res);
      this.dpi = res;
    })
  };

  convertDate(date: string): string {
    return transformDate(date);
  };

  convertMonth(month: number): string {
    const months = this._paymentService.getMonths();
    return months.find(m => m.value == month)?.description;
  };

  onListenDialog() {
    this._paymentService.dialogStatus.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.getPayments(this.dpi, this.page, this.pageSize);
    });
  };

  openDialog(payment: IPayment) {
    this.dialog.open(PaymentDialogComponent, {
      width: '500px',
      data: { payment }
    })
  }
};