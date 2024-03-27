import { ViewEncapsulation, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Observable, Subject, map, merge, switchMap, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Ivisit } from 'app/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SnackBarService } from 'app/utils';
import { VisitsService } from '../visits.service';
import { VisitorDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'visit-list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject();
  @ViewChild(MatPaginator) public _paginator: MatPaginator;
  @ViewChild(MatSort) public _sort: MatSort;

  public visitors$: Observable<Ivisit[]>;
  public visitors: Ivisit[] = [];
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
    private _visitorService: VisitsService
  ) { }

  ngOnInit(): void {
    this.getVisitors();
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

          return this._visitorService.getVisitors({ page: this._paginator.pageIndex + 1, pageSize: this._paginator.pageSize });
        }),
        map(() => this.loading = false)
      ).pipe(takeUntil(this._unsubscribeAll)).subscribe();
    };
  };

  getVisitors(page: number = 1, pageSize: number = 10) {
    this.loading = true;
    this._visitorService.getVisitors({ page, pageSize }).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.visitors$ = this._visitorService.visits$;
      this.visitors = res.visitors;
      this.page = res.page;
      this.count = res.total;
      this.pages = res.pages;
      this.loading = false
      this._changeDetectorRef.markForCheck();
    });
  };

  onListenDialog() {
    this._visitorService.dialogStatus.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.getVisitors()
    });
  };

  deleteVisitor(id: number) {

    const confirmation = this._fuseConfirmationService.open({
      title: 'Eliminar visitante',
      message: '¿Está seguro de eliminar el visitante?',
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
        this._visitorService.deleteVisit(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((code) => {

          if (code == 200) {
            this.getVisitors();
            return this._snackBarService.open('El visitante se ha eliminado.');
          }

          return this._snackBarService.open('Ha ocurrido un error al eliminar el visitante.');
        });
      }

    });
  };

  openDialog(visitor: Ivisit) {
    const dialogRef = this.dialog.open(VisitorDialogComponent, {
      width: '500px',
      data: { visitor }
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
      this.getVisitors();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };
}