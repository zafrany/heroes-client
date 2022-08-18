import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)},
  {path: 'hero', loadChildren: () => import('./modules/hero/hero.module').then((m) => m.HeroModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
