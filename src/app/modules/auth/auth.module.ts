import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupFormComponent } from './pages/signup-form/signup-form.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginSubscribeGuard } from './services/login-subscribe.guard';



@NgModule({
  declarations: [
    LoginPageComponent,
    SignupFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
  ],
  exports : [
    LoginPageComponent,
    SignupFormComponent,
  ],

  providers : [
    LoginSubscribeGuard
  ]
})
export class AuthModule { }
