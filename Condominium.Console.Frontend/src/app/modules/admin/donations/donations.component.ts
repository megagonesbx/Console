import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DonationsService } from './donations.service';
import { DonationDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent {

  constructor(public dialog: MatDialog, private _donationService: DonationsService) { }

  openDialog() {
    const dialogRef = this.dialog.open(DonationDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => this._donationService.foo());
  };
};