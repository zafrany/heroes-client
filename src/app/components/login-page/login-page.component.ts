import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  userName!: AbstractControl|null;
  password!: AbstractControl|null;
  loginFailed: boolean = false;
  res : any;
  constructor(private fb: FormBuilder, private router:Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]]
    }
    );
  }

  onSubmitLoginForm() {
    this.userName = this.loginForm.get('userName');
    this.password = this.loginForm.get('password');
    console.log("password = " + this.password?.value + " username = " + this.userName?.value);

    const requestBody = {
    "Email": this.userName?.value,
    "Password": this.password?.value,
    }

    var httpOptions = {
      headers: new HttpHeaders({
         'Accept':'application/pdf'
      }),
      'responseType': 'text'
   }

    this.http.post<any>('https://localhost:44367/api/account/login', requestBody, httpOptions).subscribe(data => {
      this.res = data;
     }
    )
  }

  invalidPasswordMessage() {
    const errors = this.password?.errors;
    if(errors?.['required'])
      return "You must enter a password.";

    if(errors?.['passInvalidChars'])
      return "Password cannot contain space and must contain at least 1 digit.";
    return null;
  }

  invalidUserNameMessage() {
    const errors = this.userName!.errors;
    if(errors?.['required']) {
      return "You must enter a user name.";
    }
    if(errors?.['minlength']) {
      return "User name have to be at least 4 characthers long.";
    }
    return null;
  }

  onPasswordInput(){
    this.loginFailed = false;
  }
}
