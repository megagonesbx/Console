import { Injectable } from '@angular/core';
import { IDonation, IGetDonationsResponse } from 'app/interfaces';
import { BehaviorSubject, Subject, Observable, map, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DonationsService {

  private fooSubject = new Subject<void>();
  private _residents: BehaviorSubject<IDonation[] | null> = new BehaviorSubject(null);
  private path: string;

  constructor(private http: HttpClient) {
    this.path = `${base_url}/donation`;
  };

  get donations$(): Observable<IDonation[]> {
    return this._residents.asObservable();
  };

  getDonations(request: { page: number, pageSize: number }) {
    return this.http.post(`${this.path}/donations`, request, this.getHeaders).pipe(
      map((res: IGetDonationsResponse) => {

        if (res.statusCode && res.statusCode == 200) {
          this._residents.next(res.data);
          return {
            donations: res.data,
            total: res.count,
            page: res.page,
            pages: res.pages
          }
        };

        return null;
      }),
      catchError((err) => of(null))
    );
  };

  createDonation(donation: IDonation) {
    return this.http.post(`${this.path}/create`, donation, this.getHeaders).pipe(
      map((res: { id: number, statusCode: number }) => (res.statusCode) ? res.statusCode : 500),
      catchError(err => of(err.status))
    );
  };

  updateDonation(donation: IDonation) {
    return this.http.put(`${this.path}/update`, donation, this.getHeaders).pipe(
      map((res: { id: number, statusCode: number }) => (res.statusCode) ? res.statusCode : 500),
      catchError(err => of(err.status))
    );
  };

  deleteDonation(id: number) {
    return this.http.delete(`${this.path}/${id}`, this.getHeaders).pipe(
      map((res: { statusCode: number }) => (res) ? res.statusCode : 500),
      catchError(err => of(err.status))
    );
  };

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