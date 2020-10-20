import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-especialidades',
  templateUrl: './ver-especialidades.component.html',
  styleUrls: ['./ver-especialidades.component.css']
})
export class VerEspecialidadesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VerEspecialidadesComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

}
