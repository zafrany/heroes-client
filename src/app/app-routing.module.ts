import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDisplayComponent } from './modules/hero/pages/hero-display/hero-display.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MyHeroesComponent } from './modules/hero/pages/my-heroes/my-heroes.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { HeroDisplayGuard } from './services/hero-display.guard';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupFormComponent},
  {path: 'heroes', component: HeroDisplayComponent, canActivate: [HeroDisplayGuard]},
  {path: 'my-heroes', component: MyHeroesComponent, canActivate: [HeroDisplayGuard]},
  {path: '', redirectTo: '/heroes', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
