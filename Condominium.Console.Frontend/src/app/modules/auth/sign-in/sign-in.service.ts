import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'app/core/user/user.service';
import { switchMap, of, Observable, map, catchError } from 'rxjs';
import { ILogin } from 'app/interfaces';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  public _authenticated: boolean = false;
  private path: string;

  constructor(
    private http: HttpClient,
    private _userService: UserService
  ) {
    this.path = `${base_url}/auth`;
    this._authenticated = false;
  }

  /**
 * Setter & getter for access token
 */
  set accessToken(token: string) {
    localStorage.setItem('x-token', token);
  }

  get getAccessToken(): string {
    return localStorage.getItem('x-token') ?? '';
  }

  loginWithCredentials(user: { email: string, password: string }) {

    return this.http.post(`${this.path}/login`, user).pipe(
      switchMap((response: ILogin) => {

        this.accessToken = response['x-token'];
        this._userService.menuStorage = response.menu;

        this._authenticated = true;
        this._userService.user = response.user;
        this._userService.menu = response.menu;


        return of(response);
      })
    );
  };

  getSession(): Observable<number> {
    return this.http.get(`${this.path}/session`, { headers: { 'x-token': this.getAccessToken }}).pipe(
      map((res: ILogin) => {        
        this._userService.user = res.user;
        this._userService.menu = res.menu;
        this._userService.menuStorage = res.menu;
        return res.statusCode;
      }),
      catchError((err) => of(500))
    );
  };

}
