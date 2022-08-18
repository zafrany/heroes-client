import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    LoaderService,
    AuthService,
  ],
})
export class CoreModule { }
