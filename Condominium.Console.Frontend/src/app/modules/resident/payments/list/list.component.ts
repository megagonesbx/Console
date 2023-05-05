import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject, map, merge, switchMap, take, takeUntil } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'app/utils';
import { PaymentService } from '../payment.service';
import { IPayment } from 'app/interfaces';
import { UserService } from 'app/core/user/user.service';

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

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private _snackBarService: SnackBarService,
    private _paymentService: PaymentService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
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

          return this._paymentService.getPayments({ dpi: 3639933470101, page: this.page, pageSize: this.pageSize })
        }),
        map(() => this.loading = false)
      ).pipe(takeUntil(this._unsubscribeAll)).subscribe();
    };
  };

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  };

  async getReports(dpi: number, page: number = 1, pageSize: number = 10) {
    try {
      this.loading = true;
      this._paymentService.getPayments({ page, pageSize, dpi }).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
        this.payments$ = this._paymentService.payments$;
        this.payments = res.payments;
        console.log(this.payments)
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

  async onListenDialog() {
    try {
      const user = await this._userService.user$.pipe(take(1)).toPromise();
      // this._paymentService.dialogStatus.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      //   this.getReports(user?.);
      // });

    } catch (error) {
      console.log(error)
    }
  };
};