import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HeroCardComponent,],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports : [
    HeroCardComponent,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
