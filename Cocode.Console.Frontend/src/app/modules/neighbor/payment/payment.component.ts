import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService as SessionService } from 'app/core/user/user.service';
import { UserService } from 'app/modules/admin/users/user.service';
import { SnackBarService } from 'app/utils';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PaymentService } from './payment.service';
import { User } from 'app/core/user/user.types';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit, OnDestroy {
    public neighbors$: Observable<any[]>;
    public neighbors: any[];

    public searchInputControl: FormControl;

    private _unsubscribeAll: Subject<null>;
    public user: User;

    constructor(
        private readonly _user: UserService,
        private readonly _dialog: MatDialog,
        private readonly _session: SessionService,
        private readonly _payments: PaymentService,
        private readonly _snackbar: SnackBarService
    ) {
        this._unsubscribeAll = new Subject();
        this.searchInputControl = new FormControl();
    }

    ngOnInit(): void {
        this.onValidateRole();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    public onValidateRole() {
        this._session.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user) => {
                this.user = user;

                // TODO: CHANGE TO VALIDATE IF NOT ADMIN 1
                if (user?.role !== 3) return;

                this.onGetNeighbor();
            });
    }

    public async onGetNeighbor() {
        this._user
            .getNeighbors()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.neighbors = data;
                this.searchInputControl.setValue(data[0]?.id);
            });

        this.neighbors$ = this._user.neighbors$;
    }

    public onOptionSelection($event: MatSelectChange) {
        this._payments.userId.next($event.value);
    }
}
