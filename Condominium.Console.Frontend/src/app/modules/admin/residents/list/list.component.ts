import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { IResident } from 'app/interfaces';
import { SnackBarService } from 'app/utils';
import { Subject, Observable, takeUntil, merge, switchMap, map } from 'rxjs';
import { ResidentsService } from '../residents.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ResidentDialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'resident-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {

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
    private _changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public _fuseConfirmationService: FuseConfirmationService,
    private _snackBarService: SnackBarService,
    private _residentService: ResidentsService
  ) { }

  ngOnInit(): void {
    this.getResidents();
    this.onListenDialog();
  }

  getResidents(dpi?: string, page: number = 1, pageSize: number = 10) {
    this.loading = true;
    this._residentService.getResidents({ dpi, page, pageSize }).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.residents$ = this._residentService.residents$;
      this.residents = res.residents;
      this.page = res.page;
      this.count = res.total;
      this.pages = res.pages;

      this.loading = false
      this._changeDetectorRef.markForCheck();
    });
  }

  openDialog(house: IResident) {
    const dialogRef = this.dialog.open(ResidentDialogComponent, {
      width: '500px',
      data: { house }
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(result => {
      this.getResidents();
    });
  }

  deleteResident(id: number) {

    const confirmation = this._fuseConfirmationService.open({
      title: 'Eliminar residencia',
      message: '¿Está seguro de eliminar la residencia?',
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
        this._residentService.deleteResident(id).pipe(takeUntil(this._unsubscribeAll)).subscribe((code) => {
          
          if (code == 200) {
            this.getResidents();
            return this._snackBarService.open('La residencia se ha eliminado.');
          }

          return this._snackBarService.open('Ha ocurrido en error al eliminar la residencia.');
        });  
      }

    });
  }

  onListenDialog() {
    this._residentService.onFoo.pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.getResidents();
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

}