import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupFormComponent } from './pages/signup-form/signup-form.component';
import { LoginSubscribeGuard } from './services/login-subscribe.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent, canActivate: [LoginSubscribeGuard]},
  {path: 'signup', component: SignupFormComponent, canActivate: [LoginSubscribeGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class AuthRoutingModule { }
