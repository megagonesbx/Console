import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject, map, merge, switchMap, takeUntil } from 'rxjs';
import { IReport } from 'app/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SnackBarService } from 'app/utils';
import { ReportsService } from '../reports.service';
import { ReportDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'report-list',
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

  public reports$: Observable<IReport[]>;
  public reports: IReport[] = [];
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
    private _reportService: ReportsService
  ) { }

  ngOnInit(): void {
    this.getReports();
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

          return this._reportService.getReports({ page: this._paginator.pageIndex + 1, pageSize: this._paginator.pageSize });
        }),
        map(() => this.loading = false)
      ).pipe(takeUntil(this._unsubscribeAll)).subscribe();
    };
  };

  getReports(page: number = 1, pageSize: number = 10) {
    this.loading = true;
    this._reportService.getReports({ page, pageSize }).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.reports$ = this._reportService.reports$;
      this.reports = res.reports;
      this.page = res.page;
      this.count = res.total;
      this.pages = res.pages;
      this.loading = false
      this._changeDetectorRef.markForCheck();
    });
  };

  onListenDialog() {
    this._reportService.dialogStatus.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.getReports()
    });
  };

  deleteReport(id: number) {

    const confirmation = this._fuseConfirmationService.open({
      title: 'Eliminar reporte',
      message: '¿Está seguro de eliminar el reporte?',
      actions: {
        confirm: {
          label: 'Eliminar'
        },
        cancel: {
          label: 'Cancelar'
        }
      }
    });

    confirmation.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {

      if (res === 'confirmed') {
        this._reportService.deleteReport(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((code) => {

          if (code == 200) {
            this.getReports();
            return this._snackBarService.open('El reporte se ha eliminado.');
          }

          return this._snackBarService.open('Ha ocurrido un error al eliminar el reporte.');
        });
      }

    });
  };

  openDialog(report: IReport) {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '500px',
      data: { report }
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
      this.getReports();
    });
  };

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };
}
