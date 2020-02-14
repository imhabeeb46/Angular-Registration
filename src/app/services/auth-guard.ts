import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authorization: AuthorizationService, private route: Router) { }

    canActivate() {
      if (this.authorization.isUserLoggedIn) {
        return true;
      } else {
        this.route.navigate(['/login']);
        return false;
      }
    }
}
