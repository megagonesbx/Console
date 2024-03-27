import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private allowedRoles: number[] = [1];

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate() {
    this._userService.user$.subscribe(user => {

      if (user && !this.allowedRoles.includes(user?.role)) {
        this._authService.signOut();
        this._router.navigate(['/auth']);
        return false;
      }

    });

    return true;
  };

}
