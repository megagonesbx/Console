import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    catchError,
    map,
    Observable,
    of,
    ReplaySubject,
    takeUntil,
} from 'rxjs';
import {
    IGetNotifications,
    INotification,
} from 'app/layout/common/notifications/notifications.types';
import { environment } from 'environments/environment';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    private _notifications: ReplaySubject<INotification[]> = new ReplaySubject<
        INotification[]
    >(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
    get notifications$(): Observable<INotification[]> {
        return this._notifications.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all notifications
     */
    getAll(email: string): Observable<IGetNotifications> {
        return this._httpClient
            .get(`${base_url}/notification/${email}`, this.getHeaders)
            .pipe(
                map((res: IGetNotifications) => {
                    if (res && res.statusCode) {
                        this._notifications.next(res.notifications);
                        return res;
                    }

                    return { notifications: [], statusCode: 500 };
                })
            );
    }

    deleteNotification(id: number | string) {
        return this._httpClient
            .delete(`${base_url}/notification/delete/${id}`, this.getHeaders)
            .pipe(
                map((res: { statusCode: number }) =>
                    res.statusCode ? res.statusCode : 500
                ),
                catchError((err) => of(err.status))
            );
    }

    updateNotification(id: number | string) {
        return this._httpClient
            .put(`${base_url}/notification/viewed/${id}`, null, this.getHeaders)
            .pipe(
                map((res: { statusCode: number }) =>
                    res.statusCode ? res.statusCode : 500
                ),
                catchError((err) => of(err.status))
            );
    }

    private get getToken() {
        return localStorage.getItem('x-token') || '';
    }

    private get getHeaders() {
        return {
            headers: {
                'x-token': this.getToken,
            },
        };
    }
}
