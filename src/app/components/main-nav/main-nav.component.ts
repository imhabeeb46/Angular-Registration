import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  user: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
      private breakpointObserver: BreakpointObserver,
      private router: Router,
      private AuthService: AuthorizationService
    ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = this.AuthService.getActiveUserInfo();
  }

  logout() {
    this.AuthService.logoutSuccessful();
    this.router.navigateByUrl('/login');
  }

}
