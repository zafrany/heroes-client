import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { HeroCardComponent } from './components/hero-card/hero-card.component';

@NgModule({
  declarations: [HeroCardComponent,],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports : [
    HeroCardComponent,
  ],
  providers: [

  ]
})
export class SharedModule { }
