import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signup } from '../models/signup.model';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(requestData: Signup) {
    const requestBody = {
      "email": requestData.email,
      "password": requestData.password,
      "confirmPassword": requestData.confirmPassword
    }

    return this.http.post('https://localhost:44367/api/account/signup', requestBody);
  }
}
