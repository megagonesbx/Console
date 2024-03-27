import { Component } from '@angular/core';
import { ReportsService } from './reports.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  constructor(public dialog: MatDialog, private _reportService: ReportsService) { }

  openDialog() {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(res => this._reportService.listenDialog());
  };

}
