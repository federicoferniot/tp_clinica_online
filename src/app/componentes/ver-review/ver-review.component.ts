import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-review',
  templateUrl: './ver-review.component.html',
  styleUrls: ['./ver-review.component.css']
})
export class VerReviewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VerReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

}
