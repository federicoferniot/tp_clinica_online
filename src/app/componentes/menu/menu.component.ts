import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  opened = false;
  role;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
  }

  salir() {
    this.authService.logout().then(response => {
      this.router.navigate((['/Login']));
    })
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  toggleSideBar() {
    this.opened = !this.opened;
  }

}
