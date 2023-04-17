import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetSpreadSheet, IGetSpreadsheetsResponse, IMonth, ISpreadsheet } from 'app/interfaces';
import { Path } from 'app/utils';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, Subject, catchError, map, of } from 'rxjs';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SpreadsheetService {

  private fooSubject = new Subject<void>();
  private _spreadsheets: BehaviorSubject<ISpreadsheet[] | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  get spreadsheets$(): Observable<ISpreadsheet[]> {
    return this._spreadsheets.asObservable();
  };


  getSpreadsheets(request: { page: number, pageSize: number, dpi?: number }): Observable<IGetSpreadSheet> {
    return this.http.post(`${base_url}/${Path.SPREADSHEET}/spreadsheets`, request, this.getHeaders).pipe(
      map((res: IGetSpreadsheetsResponse) => {

        if (res.statusCode && res.statusCode == 200) {
          this._spreadsheets.next(res.data);
          return {
            spreadsheets: res.data,
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

  getMonths(): IMonth[] {
    return [
      {
        value: 1,
        description: "Enero"
      },
      {
        value: 2,
        description: "Febrero"
      },
      {
        value: 3,
        description: "Marzo"
      },
      {
        value: 4,
        description: "Abril"
      },
      {
        value: 5,
        description: "Mayo"
      },
      {
        value: 6,
        description: "Junio"
      },
      {
        value: 7,
        description: "Julio"
      },
      {
        value: 8,
        description: "Agosto"
      },
      {
        value: 9,
        description: "Septiembre"
      },
      {
        value: 10,
        description: "Octubre"
      },
      {
        value: 11,
        description: "Noviembre"
      },
      {
        value: 12,
        description: "Diciembre"
      }
    ]
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
};