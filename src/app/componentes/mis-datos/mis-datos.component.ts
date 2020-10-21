import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {
  public usuario;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.authService.infoUsuario();
  }

}
