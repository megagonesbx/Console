import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ResidentsService } from '../../residents/residents.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IResident } from 'app/interfaces';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'solvent-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class ListComponent implements OnInit {

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
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getResidents();
  }

  getResidents(dpi?: string, page: number = 1, pageSize: number = 10) {
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
}
