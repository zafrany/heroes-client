import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
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
