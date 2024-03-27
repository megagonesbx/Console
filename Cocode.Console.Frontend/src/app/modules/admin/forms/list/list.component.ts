import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ISpreadsheet } from 'app/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';
import { SpreadsheetService } from '../spreadsheet.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SnackBarService, transformDate } from 'app/utils';
import { MatDialog } from '@angular/material/dialog';
import { SpreadsheetDialogComponent } from '../dialog/dialog.component';
import { merge } from 'lodash';

@Component({
  selector: 'spreadsheet-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  @ViewChild(MatPaginator) public _paginator: MatPaginator;
  @ViewChild(MatSort) public _sort: MatSort;

  private _unsubscribeAll: Subject<any> = new Subject();

  public spreadsheets$: Observable<ISpreadsheet[]>;
  public spreadsheets: ISpreadsheet[] = [];
  public loading: boolean;

  // MAT PAGINATOR
  public pageSize: number = 10;
  public page: number = 1;
  public count: number = 0;
  public pages: number = 0;
  public pageSizeOptions: number[] = [10, 15, 25];

  constructor(
    private _spreadsheetService: SpreadsheetService,
    private _changeDetectorRef: ChangeDetectorRef,
    public _fuseConfirmationService: FuseConfirmationService,
    private _snackBarService: SnackBarService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getSpreadsheet();
    this.onListenDialog();
  }

  getSpreadsheet(dpi?: number, page: number = 1, pageSize: number = 10) {
    this._spreadsheetService.getSpreadsheets({ page, pageSize, dpi }).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.loading = true;
      this.spreadsheets$ = this._spreadsheetService.spreadsheets$;
      this.spreadsheets = res.spreadsheets;
      this.count = res.total;
      this.page = res.page;
      this.pages = res.pages;
      
      this.loading = false;
      this._changeDetectorRef.markForCheck();
    });
  }

  getMonth(month: number): string {
    return this._spreadsheetService.getMonths().find(m => m.value == month)?.description;
  }

  formatDate(date: string): string {
    return transformDate(date);
  };

  onListenDialog() {
    this._spreadsheetService.onFoo.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.getSpreadsheet();
    });
  };

  openDialog(spreadsheet: ISpreadsheet) {
    const dialogRef = this.dialog.open(SpreadsheetDialogComponent, {
      width: '500px',
      data: { spreadsheet }
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
      this.getSpreadsheet();
    });
  }

  deleteSpreadsheet(id: number) {

    const confirmation = this._fuseConfirmationService.open({
      title: 'Eliminar registro de plainlla',
      message: '¿Está seguro de eliminar el registro?',
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
        this._spreadsheetService.deleteSpreadsheet(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((code) => {
          
          if (code == 200) {
            this.getSpreadsheet();
            return this._snackBarService.open('El registro se ha eliminado.');
          }

          return this._snackBarService.open('Ha ocurrido un error al eliminar el registro.');
        });  
      }

    });
  }

  ngAfterViewInit(): void {
    if (this._sort && this._paginator) {
      this._sort.sort({
        id: 'DPI',
        start: 'asc',
        disableClear: true
      });

      this._changeDetectorRef.markForCheck();

      merge(this._sort.sortChange, this._paginator.page).pipe(
        switchMap(() => {
          this.loading = true;
          this.pageSize = this._paginator.pageSize

          return this._spreadsheetService.getSpreadsheets({ page: this._paginator.pageIndex + 1, pageSize: this._paginator.pageSize });
        }),
        map(() => { this.loading = false, this._changeDetectorRef.markForCheck() })
      ).pipe(takeUntil(this._unsubscribeAll)).subscribe();
    };
  }
}