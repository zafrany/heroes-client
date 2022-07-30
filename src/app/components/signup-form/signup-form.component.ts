import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Signup } from 'src/app/models/signup.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;
  email!: AbstractControl|null;
  password!: AbstractControl|null;
  passwordRepeated!: AbstractControl|null;
  signupSuccess: boolean = true;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]],
    },
    {
      validators: [this.passwordRepeatedValidator]
    }
    );

    this.email = this.signupForm.get('email');
    this.password = this.signupForm.get('password');
    this.passwordRepeated = this.signupForm.get('repeatPassword');
  }

  onSubmitSubscribeForm() {
      const requestData:Signup = {
        email: this.email?.value,
        password: this.password?.value,
        confirmPassword: this.passwordRepeated?.value
      }

      this.authService.signup(requestData).subscribe({error: (err =>{
        console.log("signup failed, use exists already?");
      }),
      next: (data => {
        console.log("signup successfull - redirecting");
        this.authService.login(this.email?.value, this.password?.value).subscribe(
          {
            error: (err =>{
            console.log("login failed");
          }),
          next: (data => {
            if(data !== null) {
              console.log(data);
              this.authService.setLoggedUser(this.email?.value);
              this.router.navigate(['heroes']);
          }
          })}
        )
        this.router.navigate(['heroes']);
      })})
  }

  passwordRepeatedValidator(control: AbstractControl): ValidationErrors|null{
    const password = control.get('password')?.value;
    const passwordRepeated = control.get('repeatPassword')?.value;
    return password !== passwordRepeated ? {'passwordMismatch': true} : null;
  }

  passwordMismatchMessage() {
    if(this.passwordRepeated?.errors?.['required']){
      return 'You must repeat the password.'
    }

    if(this.signupForm.errors?.['passwordMismatch']) {
      return 'The two passwords must be identical.';
    }
    return null;
  }

  invalidEmailMessage() {
    const errors = this.email!.errors;
    if(errors?.['required']) {
      return "You must provide an email address.";
    }
    if(errors?.['email']) {
      return "You must enter a valid email address.";
    }
   return null;
  }

  invalidPasswordMessage() {
    const errors = this.password?.errors;
    if(errors?.['required'])
      return "You must enter a password.";

    if(errors?.['passInvalidChars'])
      return "Password cannot contain space and must contain at least 1 digit.";
    return null;
  }
}
