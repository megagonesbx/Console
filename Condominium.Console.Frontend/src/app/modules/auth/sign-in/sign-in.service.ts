import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'app/core/user/user.service';
import { throwError, switchMap, of } from 'rxjs';
import { ILogin } from 'app/interfaces';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private _authenticated: boolean = false;
  private path: string;

  constructor(
    private http: HttpClient,
    private _userService: UserService
  ) {
    this.path = `${base_url}/auth`
  }

  /**
 * Setter & getter for access token
 */
  set accessToken(token: string) {
    localStorage.setItem('x-token', token);
  }

  get accessToken(): string {
    return localStorage.getItem('x-token') ?? '';
  }

  loginWithCredentials(user: { email: string, password: string }) {
    
    if (this._authenticated) {
      return throwError('User is already logged in.')
    }

    return this.http.post(`${this.path}/login`, user).pipe(
      switchMap((response: ILogin) => {

        this.accessToken = response['x-token'];

        this._authenticated = true;

        this._userService.user = response.user;

        return of(response);
      })
    );
  };
}
