import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser : string|null = null;

  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authService.currentUserData.subscribe((currentUser)=>{
      this.currentUser = currentUser;
    })
  }

  loggedUser() : boolean{
    return this.currentUser !== null;
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['login']);
  }
}
