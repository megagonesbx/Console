import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { SignInService } from './sign-in/sign-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _signInService: SignInService,
    private _authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this._signInService.getSession().subscribe(res => {

      if (res !== 200) {
        this._authService.signOut();
        this.router.navigate(['/auth']);
        return false;
      }

      return true;
    });

    return true;
  }

}
