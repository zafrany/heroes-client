import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroDisplayComponent } from './pages/hero-display/hero-display.component';
import { MyHeroesComponent } from './pages/my-heroes/my-heroes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeroService } from './services/hero.service';
import { HeroDisplayGuard } from './services/hero-display.guard';
import { HeroRoutingModule } from './hero-routing.module';



@NgModule({
  declarations: [
    HeroDisplayComponent,
    MyHeroesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HeroRoutingModule
  ],
  providers: [
    HeroService,
    HeroDisplayGuard,
  ],
  exports : [],
})
export class HeroModule { }
