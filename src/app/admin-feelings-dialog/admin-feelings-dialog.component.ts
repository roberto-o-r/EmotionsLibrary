import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FeelingService } from '../shared/services/feeling.service';
import { Feeling } from '../models/feeling.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import swal from 'sweetalert2'

@Component({
  selector: 'app-admin-feelings-dialog',
  templateUrl: './admin-feelings-dialog.component.html',
  styleUrls: ['./admin-feelings-dialog.component.css']
})
export class AdminFeelingsDialogComponent implements OnInit {

  type = 1; // 1 New, 2 Edit.  
  feeling: Feeling = { id: "", name: "", description: "", related: [], relatedFeelings: [] };
  feelings;
  filteredFeelings: Feeling[];

  constructor(
    private feelingService: FeelingService,
    public dialogRef: MatDialogRef<AdminFeelingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.feeling.name = data.name;
      this.feeling.description = data.description;
      this.feeling.related = data.related;
      this.type = 2;
    }
  }

  ngOnInit() {
    // Load feelings for autocomplete.
    this.feelingService.getFeelings().subscribe(feelings => {
      this.feelings = feelings
      this.feeling.relatedFeelings = feelings.filter(f => this.feeling.related.some(r => r == f.id)); 
    });    
  }

  saveFeeling() {
    if (this.type === 1) {
      this.feelingService.addFeeling(this.feeling);
    }
    if (this.type === 2) {
      this.data.name = this.feeling.name;
      this.data.description = this.feeling.description;
      this.data.relatedFeelings = this.feeling.relatedFeelings;
      this.feelingService.updateFeeling(this.data);
    }
    this.dialogRef.close();
    this.feeling = new Feeling();
  }

  cancel() {
    this.dialogRef.close();
  }

  relatedSelected($event) {
    this.feeling.relatedFeelings.push($event.option.value);    
  }

  removeRelated(index) {
    this.feeling.relatedFeelings.splice(index, 1);
  }

  // Related feelings filter.
  filterFeelings($event) {
    this.filteredFeelings = this.feelings.filter(feeling =>
      feeling.name.toLowerCase().indexOf($event.target.value.toLowerCase()) === 0 && !this.feeling.relatedFeelings.includes(feeling));
  }

  // Display the name of the feeling when autocomplete. 
  displayName(feeling?: Feeling): string | undefined {
    return feeling ? feeling.name : undefined;
  }

}
