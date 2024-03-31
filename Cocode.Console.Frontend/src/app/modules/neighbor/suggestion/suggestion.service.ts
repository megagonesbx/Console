import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReport } from 'app/interfaces';
import { Observable, Subject, catchError, map, of } from 'rxjs';
const base_url = environment.base_url;

@Injectable({
    providedIn: 'root',
})
export class SuggestionService {
    private _onCloseDialog: Subject<void>;

    constructor(private readonly _http: HttpClient) {
        this._onCloseDialog = new Subject<void>();
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
