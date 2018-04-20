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
  feeling: Feeling = { id: "", name: "", description: "", related: [], opposite: [], relatedFeelings: [], oppositeFeelings: [] };
  feelings;
  filteredFeelingsRelated: Feeling[];
  filteredFeelingsOpposite: Feeling[];

  constructor(
    private feelingService: FeelingService,
    public dialogRef: MatDialogRef<AdminFeelingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // Verify if its a new feeling or editing an existing one.
    if (data) {
      this.feeling.id = data.id;
      this.feeling.name = data.name;
      this.feeling.description = data.description;
      this.feeling.related = data.related;
      this.feeling.opposite = data.opposite;
      this.type = 2;
    }
  }

  ngOnInit() {
    // Load feelings for autocomplete.
    this.feelingService.getFeelings().subscribe(feelings => {
      this.feelings = feelings
      this.feeling.relatedFeelings = feelings.filter(f => this.feeling.related.some(r => r == f.id));
      this.feeling.oppositeFeelings = feelings.filter(f => this.feeling.opposite.some(r => r == f.id));
    });
  }

  // Save a new feeling or existing one.
  saveFeeling() {
    // Create new feeling.
    if (this.type === 1) {
      this.feelingService.addFeeling(this.feeling);
    }
    // Edit existing feeling.
    if (this.type === 2) {
      this.data.name = this.feeling.name;
      this.data.description = this.feeling.description;
      this.data.relatedFeelings = this.feeling.relatedFeelings;
      this.data.oppositeFeelings = this.feeling.oppositeFeelings;
      this.feelingService.updateFeeling(this.data);
    }
    // Clean up.
    this.dialogRef.close();
    this.feeling = new Feeling();
  }

  // Canel the dialog.
  cancel() {
    this.dialogRef.close();
  }

  // Selects a related feeling.
  relatedSelected($event) {
    this.feeling.relatedFeelings.push($event.option.value);
  }

  // Removes a related feeling.
  removeRelated(index) {
    this.feeling.relatedFeelings.splice(index, 1);
  }

  // Filter related feelings.
  filterRelatedFeelings($event) {
    this.filteredFeelingsRelated = this.feelings.filter(feeling =>
      feeling.name.toLowerCase().indexOf($event.target.value.toLowerCase()) === 0 && !this.feeling.relatedFeelings.includes(feeling) && this.feeling.id !== feeling.id);
  }

  // Selects an opposite feeling.
  oppositeSelected($event) {
    this.feeling.oppositeFeelings.push($event.option.value);
  }

  // Removes an opposite feeling.
  removeOpposite(index) {
    this.feeling.oppositeFeelings.splice(index, 1);
  }

  // Filter related feelings.
  filterOppositeFeelings($event) {
    this.filteredFeelingsOpposite = this.feelings.filter(feeling =>
      feeling.name.toLowerCase().indexOf($event.target.value.toLowerCase()) === 0 && !this.feeling.oppositeFeelings.includes(feeling) && this.feeling.id !== feeling.id);
  }

  // Display the name of the feeling when autocomplete. 
  displayName(feeling?: Feeling): string | undefined {
    return feeling ? feeling.name : undefined;
  }

}
