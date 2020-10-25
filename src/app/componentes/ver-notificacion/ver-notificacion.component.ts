import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VerReviewComponent } from '../ver-review/ver-review.component';

@Component({
  selector: 'app-ver-notificacion',
  templateUrl: './ver-notificacion.component.html',
  styleUrls: ['./ver-notificacion.component.css']
})
export class VerNotificacionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VerReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

}
