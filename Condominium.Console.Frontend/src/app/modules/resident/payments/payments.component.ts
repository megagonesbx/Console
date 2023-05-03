import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PaymentDialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnDestroy {

  private _unsubscribeAll: Subject<null> = new Subject();

  constructor(private dialog: MatDialog) { }
  
  openDialog() {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      console.log('CLOSED')
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };

}
