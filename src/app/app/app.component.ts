import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubscribeDialogComponent } from '../subscribe-dialog/subscribe-dialog.component';
import { LoginComponent } from '../login/login.component';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  email: string;

  constructor(public sessionService: SessionService, private dialog: MatDialog) { 
  }

  ngOnInit() {
    //setTimeout(() => { this.openSubscribe(); }, 3000);
  }

  openSubscribe() {
    let dialogRef = this.dialog.open(SubscribeDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.email = result;
    });
  }

  openLogin() {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }

  logOut(){
    this.sessionService.logOut();
  }

}
