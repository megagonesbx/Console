import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ISpreadsheet } from 'app/interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SpreadsheetService } from '../spreadsheet.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SnackBarService, transformDate } from 'app/utils';

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
    private _snackBarService: SnackBarService,) { }

  ngOnInit(): void {
    this.getSpreadsheet();
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
}