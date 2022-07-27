import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Hero } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/hero.service';


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
  myHeroes : Hero[] = [];
  constructor(private fb: FormBuilder, private router:Router, private authService: AuthService, private heroService: HeroService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]]
    }
    );

    this.heroService.heroList.pipe(tap(heroes =>{
      console.log(heroes);
    })).subscribe((heroes) => {
      this.myHeroes = heroes;
    })
  }

  onSubmitLoginForm() {
    this.userName = this.loginForm.get('userName');
    this.password = this.loginForm.get('password');
    console.log("attempting login with: " + " username = " + this.userName?.value + " password = " + this.password?.value);

    this.authService.login(this.userName?.value, this.password?.value).subscribe(
      {
        error: (err =>{
        console.log("login failed");
      }),
      next: (data => {
        if(data !== null) {
          console.log(data);
          localStorage.setItem('token', data.token);
      }
      })}
    )
  }

  getMyHeroes() {
    this.heroService.getMyHeroes().subscribe(
      {
        error: (err =>{
        console.log("get my heroes error!");
      }),
      next: data => {
        this.heroService.setHeroList(data);
      }
      })
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
