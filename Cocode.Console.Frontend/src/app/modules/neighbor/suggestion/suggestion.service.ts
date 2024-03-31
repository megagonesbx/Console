import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetReports, IGetReportsResponse, IReport } from 'app/interfaces';
import {
    BehaviorSubject,
    Observable,
    Subject,
    catchError,
    map,
    of,
} from 'rxjs';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root',
})
export class SuggestionService {
    private _reports: BehaviorSubject<any[] | null>;
    private _onCloseDialog: Subject<void>;

    constructor(private readonly _http: HttpClient) {
        this._onCloseDialog = new Subject<void>();
        this._reports = new BehaviorSubject(null);
    }

    get reports$(): Observable<any[]> {
        return this._reports.asObservable();
    }

    public createReport(report: IReport): Observable<number> {
        return this._http
            .post(`${base_url}/incident/create`, report, this.getHeaders)
            .pipe(
                map((res: { id: number; statusCode: number }) =>
                    res.statusCode ? res.statusCode : 500
                ),
                catchError((err) => of(err.status))
            );
    }

    public getReports(request: {
        page: number;
        pageSize: number;
    }): Observable<IGetReports | null> {
        return this._http
            .post(`${base_url}/incident/incidents`, request, this.getHeaders)
            .pipe(
                map((res: IGetReportsResponse) => {
                    if (res.statusCode && res.statusCode == 200) {
                        this._reports.next(res.data);
                        return {
                            reports: res.data,
                            total: res.count,
                            page: res.page,
                            pages: res.pages,
                        };
                    }

                    return null;
                }),
                catchError((err) => of(null))
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

    public onCloseDialog() {
        this._onCloseDialog.next();
    }

    public get onGetDialog() {
        return this._onCloseDialog.asObservable();
    }
}
