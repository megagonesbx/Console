import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from 'app/core/user/user.service';
import { IPayment } from 'app/interfaces';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PaymentService } from '../payment.service';

@Component({
    selector: 'payment-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
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

    public userId: number;

    constructor(
        public dialog: MatDialog,
        private readonly _user: UserService,
        private readonly _payment: PaymentService,
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.onChangeNeighbors();
    }

    public onChangeNeighbors() {
        this._payment.userId$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                this.userId = res;
            });
    }
}
