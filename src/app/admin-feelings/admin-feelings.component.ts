import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource, MatDialog } from '@angular/material';
import { Feeling } from '../models/feeling.model';
import swal from 'sweetalert2'
import { DataSource } from '@angular/cdk/collections';
import { FeelingService } from '../shared/services/feeling.service';
import { AdminFeelingsDialogComponent } from '../admin-feelings-dialog/admin-feelings-dialog.component';

@Component({
  selector: 'app-admin-feelings',
  templateUrl: './admin-feelings.component.html',
  styleUrls: ['./admin-feelings.component.css']
})
export class AdminFeelingsComponent implements OnInit {

  displayedColumns = ['name', 'description', 'actions'];
  dataSource = new FeelingDataSource(this.feelingService);

  constructor(private feelingService: FeelingService, private dialog: MatDialog) { }

  ngOnInit() { }

  newFeeling() {
    let dialogRef = this.dialog.open(AdminFeelingsDialogComponent, {
      width: '800px'
    });
  }

  editFeeling(feeling) {
    let dialogRef = this.dialog.open(AdminFeelingsDialogComponent, {
      width: '800px',
      data: feeling
    });
  }

  deleteFeeling(feeling) {    
    swal({
      title: "Confirm",
      text: "Are you sure you want to delete this feeling?",
      type: "warning",
      showCancelButton: true,
      reverseButtons: true     
    }).then((result) => {
      if (result.value) {
        this.feelingService.deleteFeeling(feeling);
      }
    });
  }

}

export class FeelingDataSource extends DataSource<any> {

  constructor(private feelingService: FeelingService) {
    super()
  }

  connect() {
    return this.feelingService.getFeelings();
  }

  disconnect() {

  }
}