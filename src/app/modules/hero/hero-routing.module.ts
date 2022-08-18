import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroDisplayComponent } from './pages/hero-display/hero-display.component';
import { MyHeroesComponent } from './pages/my-heroes/my-heroes.component';
import { HeroDisplayGuard } from './services/hero-display.guard';

const routes: Routes = [
  {path: 'heroes', component: HeroDisplayComponent, canActivate: [HeroDisplayGuard]},
  {path: 'my-heroes', component: MyHeroesComponent, canActivate: [HeroDisplayGuard]},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],

})
export class HeroRoutingModule { }
