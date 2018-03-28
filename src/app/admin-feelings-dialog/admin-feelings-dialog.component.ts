import { Component, OnInit, Inject } from '@angular/core';
import { FeelingService } from '../shared/services/feeling.service';
import { Feeling } from '../models/feeling.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import swal from 'sweetalert2'

@Component({
  selector: 'app-admin-feelings-dialog',
  templateUrl: './admin-feelings-dialog.component.html',
  styleUrls: ['./admin-feelings-dialog.component.css']
})
export class AdminFeelingsDialogComponent implements OnInit {

  type = 1; // 1 New, 2 Edit.
  feeling: Feeling = {id:"", name: "", description: "" };

  constructor(
    private feelingService: FeelingService,
    public dialogRef: MatDialogRef<AdminFeelingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.feeling.name = data.name;
      this.feeling.description = data.description;
      this.type = 2;
    }
  }

  ngOnInit() {
  }

  saveFeeling() {
    if (this.type === 1) {      
      this.feelingService.addFeeling(this.feeling);      
    }
    if (this.type === 2) {
      this.data.name = this.feeling.name;
      this.data.description = this.feeling.description;
      this.feelingService.updateFeeling(this.data);
    }
    this.dialogRef.close();
    this.feeling = new Feeling();
  }

  cancel() {
    this.dialogRef.close();
  }

}
