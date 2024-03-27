import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { ResidentsService } from '../../residents/residents.service';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IResident } from 'app/interfaces';
import { fuseAnimations } from '@fuse/animations';
import { merge } from 'lodash';
import { SolventsService } from '../solvents.service';
import { SnackBarService } from 'app/utils';
import { MatDialog } from '@angular/material/dialog';
import { SolventDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'solvent-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) public _paginator: MatPaginator;
  @ViewChild(MatSort) public _sort: MatSort;

  private _unsubscribeAll: Subject<any> = new Subject();
  public residents$: Observable<IResident[]>;
  public residents: IResident[] = [];
  public loading: boolean;

  // MAT PAGINATOR
  public pageSize: number = 10;
  public page: number = 1;
  public count: number = 0;
  public pages: number = 0;
  public pageSizeOptions: number[] = [10, 15, 25];

  constructor(
    private _residentService: ResidentsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matdialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getResidents();
    this.onListenDialog();
  }

  getResidents(dpi?: string, page: number = 1, pageSize: number = 100) {
    this.loading = true;
    this._residentService.getResidents({ dpi, page, pageSize }).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {
      this.residents$ = this._residentService.residents$;
      this.residents = res.residents;
      this.page = res.page;
      this.count = res.total;
      this.pages = res.pages;

      this.loading = false;
      this._changeDetectorRef.markForCheck();
    });
  };

  ngAfterViewInit(): void {
    if (this._sort && this._paginator) {
      this._sort.sort({
        id: 'owner',
        start: 'asc',
        disableClear: true
      });

      this._changeDetectorRef.markForCheck();

      merge(this._sort.sortChange, this._paginator.page).pipe(
        switchMap(() => {
          this.loading = true;
          this.pageSize = this._paginator.pageSize

          return this._residentService.getResidents({ page: this._paginator.pageIndex + 1, pageSize: this._paginator.pageSize });
        }),
        map(() => { this.loading = false, this._changeDetectorRef.markForCheck() })
      ).pipe(takeUntil(this._unsubscribeAll)).subscribe();
    };
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  openDialog(resident: IResident) {
    const dialogRef = this._matdialog.open(SolventDialogComponent, {
      width: '500px',
      data: { resident }
    });
  }

  onListenDialog() {
    this._residentService.onFoo.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.getResidents();
    });
  };
}
