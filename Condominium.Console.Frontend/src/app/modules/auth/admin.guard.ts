import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from 'app/core/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  private allowedRoles: number[] = [1];

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  canActivate() {
  
    if (!this.allowedRoles.includes(this._userService.user.role)) {
      this._router.navigate(['/']);
      return;
    }

    return true;
  };

}
