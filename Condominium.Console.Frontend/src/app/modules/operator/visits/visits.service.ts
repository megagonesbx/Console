import { Injectable } from '@angular/core';
import { IGetVisitors, IGetVisitorsResponse, Ivisit } from 'app/interfaces';
import { BehaviorSubject, Observable, map, catchError, of, Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  private onlistenSubject = new Subject<void>();
  private _visits: BehaviorSubject<Ivisit[] | null> = new BehaviorSubject(null);

  constructor(private _http: HttpClient) { }

  get visits$(): Observable<Ivisit[]> {
    return this._visits.asObservable();
  };

  getVisitors(request: { page: number, pageSize: number }): Observable<IGetVisitors | null> {
    return this._http.post(`${base_url}/visitor/visitors`, request, this.getHeaders).pipe(
      map((res: IGetVisitorsResponse) => {

        if (res.statusCode && res.statusCode == 200) {
          this._visits.next(res.data);
          return {
            visitors: res.data,
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

  createVisit(visit: Ivisit): Observable<number> {
    return this._http.post(`${base_url}/visitor/create`, visit, this.getHeaders).pipe(
      map((res: { id: number, statusCode: number }) => (res.statusCode) ? res.statusCode : 500),
      catchError(err => of(err.status))
    );
  };

  updateVisit(visit: Ivisit): Observable<number> {
    return this._http.put(`${base_url}/visitor/update`, visit, this.getHeaders).pipe(
      map((res: { id: number, statusCode: number }) => (res.statusCode) ? res.statusCode : 500),
      catchError(err => of(err.status))
    );
  };
  
  deleteVisit(id: number): Observable<number> {
    return this._http.delete(`${base_url}/visitor/delete/${id}`, this.getHeaders).pipe(
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
};