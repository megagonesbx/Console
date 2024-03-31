import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IReport } from 'app/interfaces';
import { SuggestionComponent } from 'app/modules/neighbor/suggestion/suggestion.component';
import { SuggestionService } from 'app/modules/neighbor/suggestion/suggestion.service';
import { SnackBarService } from 'app/utils';
import { Observable, Subject, map, merge, switchMap, takeUntil } from 'rxjs';

@Component({
    selector: 'report-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
    private _unsubscribeAll: Subject<any>;

    private _dialogRef: MatDialogRef<SuggestionComponent, any>;
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    public reports$: Observable<IReport[]>;
    public reports: IReport[] = [];
    public loading: boolean;

    public pageSize: number = 10;
    public page: number = 1;
    public count: number = 0;
    public pages: number = 0;
    public pageSizeOptions: number[] = [10, 15, 25];

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _service: SuggestionService,
        private readonly _snackbar: SnackBarService,
        private readonly dialog: MatDialog
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.getReports();
        this.onListenDialog();
    }

    ngAfterViewInit(): void {
        if (this._sort && this._paginator) {
            this._sort.sort({
                id: 'id',
                start: 'asc',
                disableClear: true,
            });

            this._changeDetectorRef.markForCheck();

            merge(this._sort.sortChange, this._paginator.page)
                .pipe(
                    switchMap(() => {
                        this.loading = true;
                        this.pageSize = this._paginator.pageSize;

                        return this._service.getReports({
                            page: this._paginator.pageIndex + 1,
                            pageSize: this._paginator.pageSize,
                        });
                    }),
                    map(() => (this.loading = false))
                )
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe();
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    private getReports(page: number = 1, pageSize: number = 10) {
        this.loading = true;
        this._service
            .getReports({ page, pageSize })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this.reports = res.reports;
                this.page = res.page;
                this.count = res.total;
                this.pages = res.pages;
                this.loading = false;
                this._changeDetectorRef.markForCheck();
            });

        this.reports$ = this._service.reports$;
    }

    public openDialog(report: IReport) {
        this._dialogRef = this.dialog.open(SuggestionComponent, {
            width: '500px',
            data: report,
        });
    }

    private onListenDialog() {
        this._service.onGetDialog
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => this._dialogRef.close());
    }
}
