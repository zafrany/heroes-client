import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeroDisplayComponent } from './components/hero-display/hero-display.component';

import { MyHeroesComponent } from './components/my-heroes/my-heroes.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module'; //to be removed


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupFormComponent,
    HeroDisplayComponent,
    MyHeroesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule //to be removed

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
