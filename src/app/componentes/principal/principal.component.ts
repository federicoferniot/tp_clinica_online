import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  public nombre;
  public apellido;
  public role;

  constructor(private router: Router, private authService: AuthService) {
    this.nombre = this.authService.infoUsuario().nombre;
    this.apellido = this.authService.infoUsuario().apellido;
    this.role = this.authService.infoUsuario().role;
  }

  ngOnInit(): void {
  }
}
