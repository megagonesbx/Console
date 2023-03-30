import { Injectable } from '@angular/core';
import { Router, CanActivateChild, CanActivate } from '@angular/router';
import { getMainRoute } from 'app/utils/menu';
import { SignInService } from './sign-in/sign-in.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _signInService: SignInService,
    private _router: Router
  ) { }

  canActivate() {
    return true;
  };

}
