import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResidentDialogComponent } from './dialog/dialog.component';
import { ResidentsService } from './residents.service';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {

  constructor(public dialog: MatDialog, private _residentService: ResidentsService) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ResidentDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => this._residentService.foo());
  }
}
