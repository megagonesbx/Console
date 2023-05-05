import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetPayments, IGetPaymentsResponse, IPayment } from 'app/interfaces';
import { BehaviorSubject, Observable, Subject, catchError, map, of } from 'rxjs';
import { environment } from 'environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private onlistenSubject = new Subject<void>();
  private _payments: BehaviorSubject<IPayment[] | null> = new BehaviorSubject(null);
  public onListenDPI = new Subject<string>();

  constructor(private _http: HttpClient) { }

  get dpi$(): Observable<string> {
    return this.onListenDPI.asObservable()
  }

  get payments$(): Observable<IPayment[]> {
    return this._payments.asObservable();
  };

  getPayments(request: { page: number, pageSize: number, dpi: string }): Observable<IGetPayments | null> {
    return this._http.post(`${base_url}/payment/payments`, request, this.getHeaders).pipe(
      map((res: IGetPaymentsResponse) => {

        if (res.statusCode && res.statusCode == 200) {
          this._payments.next(res.data);
          return {
            payments: res.data,
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

  createPayment(payment: IPayment): Observable<number> {
    return this._http.post(`${base_url}/payment/create`, payment, this.getHeaders).pipe(
      map((res: { id: number, statusCode: number }) => (res.statusCode) ? res.statusCode : 500),
      catchError(err => of(err.status))
    );
  };

  getMonths() {
    return [
      { description: "Enero", value: 1 },
      { description: "Febrero", value: 2 },
      { description: "Marzo", value: 3 },
      { description: "Abril", value: 4 },
      { description: "Mayo", value: 5 },
      { description: "Junio", value: 6 },
      { description: "Julio", value: 7 },
      { description: "Agosto", value: 8 },
      { description: "Septiembre", value: 9 },
      { description: "Octubre", value: 10 },
      { description: "Noviembre", value: 11 },
      { description: "Diciembre", value: 12 }
    ];
  }

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
}
