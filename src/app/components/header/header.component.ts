import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser : string|null = null;

  constructor(authService : AuthService) { }

  ngOnInit(): void {
  }

  loggedUser() : boolean{
    return this.currentUser !== null;
  }

  onLogout() {

  }
}
