import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INewUser, IUser, Users } from 'app/interfaces';
import { environment } from 'environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { INewUserResponse } from '../../../interfaces/user/user';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private path: string;

  constructor(private _http: HttpClient) {
    this.path = `${base_url}/user`
  }

  getUsers(request: { roleId: number, page: number, pageSize: number }): Observable<Users | null> {
    return this._http.post(`${this.path}/users`, request, this.getHeaders).pipe(
      map((res: IUser) => {

        if (res.statusCode && res.statusCode == 200) {
          return {
            users: res.data,
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

  createUser(user: INewUser): Observable<number> {
    return this._http.post(`${this.path}/create`, user, this.getHeaders).pipe(
      map((res: INewUserResponse) => (res.statusCode) ? res.statusCode : 500),
      catchError(err => of(500))
    )
  }

  updateUser(user: INewUser) {
    return this._http.put(`${this.path}/update`, user, this.getHeaders).pipe(
      map((res: { statusCode: number }) => (res) ? res.statusCode : 500),
      catchError(err => of(500))
    )
  }

  deleteUser(id: number) {
    return this._http.delete(`${this.path}/${id}`, this.getHeaders).pipe(
      map((res: { statusCode: number }) => (res) ? res.statusCode : 500),
      catchError(err => of(500))
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
  // INTERNAL

}
