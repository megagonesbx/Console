import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, of, Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { IGetReports, IGetReportsResponse, IReport } from 'app/interfaces';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private onlistenSubject = new Subject<void>();
  private _reports: BehaviorSubject<any[] | null> = new BehaviorSubject(null);

  constructor(private _http: HttpClient) { }

  get reports$(): Observable<any[]> {
    return this._reports.asObservable();
  };

  getReports(request: { page: number, pageSize: number }): Observable<IGetReports | null> {
    return this._http.post(`${base_url}/incident/incidents`, request, this.getHeaders).pipe(
      map((res: IGetReportsResponse) => {

        if (res.statusCode && res.statusCode == 200) {
          this._reports.next(res.data);
          return {
            reports: res.data,
            total: res.count,
            page: res.page,
            pages: res.pages
          };
        }

        return null;
      }),
      catchError((err) => of(null))
    )
  };

  createReport(report: IReport): Observable<number> {
    return this._http.post(`${base_url}/incident/create`, report, this.getHeaders).pipe(
      map((res: { id: number, statusCode: number }) => (res.statusCode) ? res.statusCode : 500),
      catchError(err => of(err.status))
    );
  };

  updateReport(report: IReport): Observable<number> {
    return this._http.put(`${base_url}/incident/update`, report, this.getHeaders).pipe(
      map((res: { id: number, statusCode: number }) => (res.statusCode) ? res.statusCode : 500),
      catchError(err => of(err.status))
    );
  };
  
  deleteReport(id: number): Observable<number> {
    return this._http.delete(`${base_url}/incident/delete/${id}`, this.getHeaders).pipe(
      map((res: { id: number, statusCode: number }) => (res.statusCode) ? res.statusCode : 500),
      catchError(err => of(err.status))
    );
  };

  // INTERNAL
  private get getToken() {
    return localStorage.getItem('x-token') || "";
  };

  private get getHeaders() {
    return {
      'headers': {
        'x-token': this.getToken
      }
    }
  };

  listenDialog() {
    this.onlistenSubject.next();
  };

  get dialogStatus() {
    return this.onlistenSubject.asObservable();
  };
  //
}
