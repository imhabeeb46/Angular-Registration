import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private allUsersData: Array<any> = []; // use User interface insted of any
  private isLoggedIn = false;
  loginInfo: any;
  constructor( private snackBar: MatSnackBar ) { }

  private addNewUser(newUserData) {
    this.allUsersData.push(newUserData);
    localStorage.setItem('user', JSON.stringify(this.allUsersData));
  }

  isUserExist(data): boolean {
    const users = JSON.parse(localStorage.getItem('user'));
    this.allUsersData = users? users : this.allUsersData;
    return this.allUsersData.filter( userData => userData.userName === data.userName || data.email === userData.email ).length !== 0;
  }

  isUserExistt(data): boolean {
    const users = JSON.parse(localStorage.getItem('user'));
    this.allUsersData = users? users : this.allUsersData;
    return this.allUsersData.filter( userData => userData.userName === data.email || data.email === userData.email ).length !== 0;
  }

  isCredentialsMatch(data): boolean {
    const users = JSON.parse(localStorage.getItem('user'));
    this.allUsersData = users? users : this.allUsersData;
    const filteredUser = this.allUsersData.filter( userData => data.email === userData.userName || data.email === userData.email );
    this.loginInfo = filteredUser[0];
    return filteredUser.length === 1 && filteredUser.filter( user => user.password === data.password ).length !== 0;
  }

  getActiveUserInfo() {
    return this.loginInfo = this.loginInfo? this.loginInfo : this.allUsersData.pop();
  }

  signupSuccessful(newUserData) {
    this.addNewUser(newUserData);
    this.isLoggedIn = true;
  }

  loginSuccessful() {
    this.isLoggedIn = true;
  }

  logoutSuccessful() {
    this.isLoggedIn = false;
  }

  validateUser(formData) {
    return ((this.loginInfo.email === formData.email ||
        this.loginInfo.userName === formData.email) &&
        this.loginInfo.password === formData.password);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['snackbar'],
      verticalPosition: 'top'
    });
  }

  get isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
