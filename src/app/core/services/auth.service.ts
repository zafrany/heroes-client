import { Injectable } from '@angular/core';
import { Token } from 'src/app/models/token.model';
import { Signup } from 'src/app/models/signup.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { tap,Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
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

  setLoggedUser(user : string|null) {
    this._loggedUser = user;
    this._loggedUserSubject.next(this._loggedUser);
  }

  getLoggedUser(): string|null {
    return this._loggedUser;
  }

  logoutUser(){
    this.setLoggedUser(null);
    sessionStorage.removeItem("token");
    this._authToken = null;
  }

  loggedUser(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    });

    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }

    return this.http.get<string>(environment.serverUrl + '/account/loggedUser' , requestOptions).pipe(tap(userName=>{
      console.log(userName);
    }))
  }

}
