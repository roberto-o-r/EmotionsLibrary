import { Component, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material';
import { Feeling } from '../models/feeling.model';
import swal from 'sweetalert2'
import { DataSource } from '@angular/cdk/collections';
import { FeelingService } from '../shared/services/feeling.service';

@Component({
  selector: 'app-admin-feelings',
  templateUrl: './admin-feelings.component.html',
  styleUrls: ['./admin-feelings.component.css']
})
export class AdminFeelingsComponent implements OnInit {

  displayedColumns = ['name', 'description'];
  dataSource = new FeelingDataSource(this.feelingService);
  action = 0; // 1 - New, 2 - Edit.
  feeling: Feeling = {name: "", description: ""};

  constructor(private feelingService: FeelingService) {}

  ngOnInit() {}

  newFeeling() {
    this.action = 1;
  }

  saveFeeling() {
    if (this.feeling.name.trim().length && this.feeling.description.trim().length) {
      this.feelingService.addFeeling(this.feeling);
      this.feeling = new Feeling();
    } else {
      swal("Please complete the feeling information");
    }
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