import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { IDonation } from 'app/interfaces';
import { Subject, Observable, takeUntil, merge, switchMap, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SnackBarService } from 'app/utils';
import { DonationsService } from '../donations.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DonationDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'donation-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {

  private _unsubscribeAll: Subject<any> = new Subject();
  @ViewChild(MatPaginator) public _paginator: MatPaginator;
  @ViewChild(MatSort) public _sort: MatSort;

  public donations$: Observable<IDonation[]>;
  public donations: IDonation[] = [];
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
    public _fuseConfirmationService: FuseConfirmationService,
    private _snackBarService: SnackBarService,
    private _donationService: DonationsService
  ) { }

  ngOnInit(): void {
    this.getDonations();
    this.onListenDialog();
  };

  getDonations(page: number = 1, pageSize: number = 10) {
    this.loading = true;
    this._donationService.getDonations({ page, pageSize }).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.donations$ = this._donationService.donations$;
      this.donations = res.donations;
      this.page = res.page;
      this.count = res.total;
      this.pages = res.pages;
      this.loading = false
      this._changeDetectorRef.markForCheck();
    });
  };

  openDialog(donation: IDonation) {
    const dialogRef = this.dialog.open(DonationDialogComponent, {
      width: '500px',
      data: { donation }
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
      this.getDonations();
    });
  }

  onListenDialog() {
    this._donationService.onFoo.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.getDonations()
    });
  };

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

          return this._donationService.getDonations({ page: this._paginator.pageIndex + 1, pageSize: this._paginator.pageSize });
        }),
        map(() => this.loading = false)
      ).pipe(takeUntil(this._unsubscribeAll)).subscribe();
    };
  };

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };
}
