import { Injectable } from '@angular/core';
import { Token } from 'src/app/models/token.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private authToken: string|null = null;

  constructor(private http: HttpClient) {}

  get token() {
    if(this.authToken === null){
      this.authToken = localStorage.getItem('token');
    }
    return this.authToken;
  }

  login(userName: string, password: string){
    const requestBody = {
      "Email": userName,
      "Password": password
    }

    this.http.post<Token>('https://localhost:44367/api/account/login', requestBody).subscribe(data => {
      if(data !== null) {
        localStorage.setItem('token', data.token);
      }
      }
    )
  }
}
