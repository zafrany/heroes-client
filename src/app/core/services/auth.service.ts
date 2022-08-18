import { Injectable } from '@angular/core';
import { Token } from 'src/app/modules/auth/models/token.model';
import { Signup } from 'src/app/modules/auth/models/signup.model';
import { HttpClient } from '@angular/common/http';
import { tap,Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService{
  private _authToken: string|null = null;

  private _loggedUser: string|null = null;
  private _loggedUserSubject = new Subject<string|null> ();

  currentUserData = this._loggedUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  get token() {
    if(this._authToken === null){
      this._authToken = sessionStorage.getItem('token');
    }
    return this._authToken;
  }

  get currentUser() {
    return this._loggedUser;
  }

  login(userName: string, password: string){
    const requestBody = {
      "Email": userName,
      "Password": password
    }

    return this.http.post<Token>(environment.serverUrl + '/account/login', requestBody).pipe(tap((token: Token) => {
      sessionStorage.setItem("token", token.token);
    }))
  }

  signup(requestData: Signup) {
    const requestBody = {
      "email": requestData.email,
      "password": requestData.password,
      "confirmPassword": requestData.confirmPassword
    }

    return this.http.post(environment.serverUrl + '/account/signup', requestBody);
  }

  setLoggedUser(user : string) {
    this._loggedUser = user;
    sessionStorage.setItem("loggedUser", user);
    this._loggedUserSubject.next(this._loggedUser);
  }

  logoutUser(){
    sessionStorage.removeItem("token");
    this._authToken = null;

    sessionStorage.removeItem("loggedUser");
    this._loggedUser = null;
    this._loggedUserSubject.next(null);
  }

  loggedUser(){
    if(this._loggedUser === null){
      this._loggedUser = sessionStorage.getItem('loggedUser');
    }
    this._loggedUserSubject.next(this._loggedUser);
  }
}
