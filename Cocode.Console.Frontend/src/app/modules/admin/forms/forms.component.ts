import { Component, OnDestroy } from '@angular/core';
import { SpreadsheetService } from './spreadsheet.service';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SpreadsheetDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnDestroy {

  private _unsubscribeAll: ReplaySubject<any> = new ReplaySubject();

  constructor(private _spreadsheetService: SpreadsheetService, public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(SpreadsheetDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => this._spreadsheetService.foo());
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
};