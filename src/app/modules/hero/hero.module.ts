import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroDisplayComponent } from './pages/hero-display/hero-display.component';
import { MyHeroesComponent } from './pages/my-heroes/my-heroes.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HeroDisplayComponent,
    MyHeroesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports : [
    HeroDisplayComponent,
    MyHeroesComponent,
  ],
})
export class HeroModule { }
