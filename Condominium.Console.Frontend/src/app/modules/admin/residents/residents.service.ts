import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetResidentsResponse, IResident } from 'app/interfaces';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, Subject, catchError, map, of } from 'rxjs';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ResidentsService {

  private fooSubject = new Subject<void>();
  private _residents: BehaviorSubject<IResident[] | null> = new BehaviorSubject(null);
  private path: string;

  constructor(private http: HttpClient) { 
    this.path = `${base_url}/resident`
  };

  get residents$(): Observable<IResident[]> {
    return this._residents.asObservable();
  };

  getResidents(request: { dpi?: string, page: number, pageSize: number }) {
    return this.http.post(`${this.path}/residents`, request, this.getHeaders).pipe(
      map((res: IGetResidentsResponse) => {
        
        if (res.statusCode && res.statusCode == 200) {
          this._residents.next(res.data);
          return {
            residents: res.data,
            total: res.count,
            page: res.page,
            pages: res.pages
          }
        }

        return null;

      }),
      catchError((err) => of(null))
    );
  };

  createResident(house: IResident) {
    return this.http.post(`${this.path}/create`, house, this.getHeaders).pipe(
      map((res: { id: number, statusCode: number }) => (res.statusCode) ? res.statusCode : 500),
      catchError(err => of(err.status))
    )
  }

  updateResident(house: IResident) {
    return this.http.put(`${this.path}/update`, house, this.getHeaders).pipe(
      map((res: { id: number, statusCode: number }) => (res.statusCode) ? res.statusCode : 500),
      catchError(err => of(err.status))
    )
  }

  deleteResident(id: number) {
    return this.http.delete(`${this.path}/${id}`, this.getHeaders).pipe(
      map((res: { statusCode: number }) => (res) ? res.statusCode : 500),
      catchError(err => of(err.status))
    )
  }

  // INTERNAL
  get getToken() {
    return localStorage.getItem('x-token') || "";
  }

  get getHeaders() {
    return {
      'headers': {
        'x-token': this.getToken
      }
    }
  }

  foo(): void {
    this.fooSubject.next();
  }

  get onFoo() {
    return this.fooSubject.asObservable();
  };

  // INTERNAL
}
