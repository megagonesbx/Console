import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VisitsService } from './visits.service';
import { VisitorDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent {

  constructor(public dialog: MatDialog, private _visitorService: VisitsService) { }

  openDialog() {
    const dialogRef = this.dialog.open(VisitorDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => this._visitorService.listenDialog());
  };
}
