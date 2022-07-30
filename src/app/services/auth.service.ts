import { Injectable } from '@angular/core';
import { Token } from 'src/app/models/token.model';
import { Signup } from '../models/signup.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private _authToken: string|null = null;
  private _loggedUser: string|null = null;

  constructor(private http: HttpClient) {}

  get token() {
    if(this._authToken === null){
      this._authToken = sessionStorage.getItem('token');
    }
    return this._authToken;
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
  }

  getLoggedUser(): string|null {
    return this._loggedUser;
  }

}
