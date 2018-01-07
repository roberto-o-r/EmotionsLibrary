import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubscribeDialogComponent } from '../subscribe-dialog/subscribe-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: string;

  constructor(public dialog: MatDialog) { 
    this.openDialog();
  }

  ngOnInit() {
    
  }

  openDialog() {
    let dialogRef = this.dialog.open(SubscribeDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.email = result;
    });
  }

}
