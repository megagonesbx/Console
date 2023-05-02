import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, Subject, catchError, map, of } from 'rxjs';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SolventsService {

  private onlistenSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  setSolventResident(id: string) {
    return this.http.patch(`${base_url}/resident/solvent/${id}`, null, this.getHeaders)
      .pipe(
        map((res: { statusCode: number }) => (res.statusCode) ? res.statusCode : 500),
        catchError((err) => err.status)
    );
  };

  sendNotification(request: { email: string }) {
    return this.http.post(`${base_url}/notification/create`, request, this.getHeaders)
      .pipe(
        map((res: { statusCode: number, id: number }) => (res.statusCode) ? res.statusCode : 500),
        catchError((err) => err.status)
      )
  };

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
};