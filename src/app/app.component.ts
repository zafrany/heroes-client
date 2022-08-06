import { Component } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loaderOpen : boolean = true;

  constructor(private authService : AuthService, private loaderService : LoaderService) { }

  ngOnInit(): void {

    this.loaderService.currentLoaderState.subscribe((loaderOpen)=>{
      this.loaderOpen = loaderOpen;
    })

    setTimeout(() => {
      this.loaderService.closeLoader();
    }, 2000);

    this.authService.loggedUser().subscribe({
      error: (err =>{
      console.log("loggedUser error!");
    }),
    next: userName => {
      this.authService.setLoggedUser(userName);
    }
    })
  }

  title = 'heroes';
}
