import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SolventsService } from '../solvents.service';
import { SnackBarService } from 'app/utils';
import { Subject, takeUntil } from 'rxjs';
import { IResident } from 'app/interfaces';
import { ResidentsService } from '../../residents/residents.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styles: [`
    .button-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
    }  
  `]
})
export class SolventDialogComponent implements OnDestroy {

  private _unsubscribeAll: Subject<any> = new Subject();
  private resident: IResident;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SolventDialogComponent>,
    private _solventService: SolventsService,
    private _snackbarService: SnackBarService,
    private _residentService: ResidentsService
  ) { 
    if (this.data?.resident)
      this.resident = this.data?.resident;
  }

  setSolvent() {
    this._solventService.setSolventResident(JSON.stringify(this.resident.id)).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {

      
      if (res == 200) {
        this.onClose();
        this._residentService.foo();
        return this._snackbarService.open('Se ha actualizado el estado de la residencia');
      }

      return this._snackbarService.open('Ha ocurrido un error al actualizar el estado de la residencia');
    })
  };

  sendNotificationToResident() {
    this._solventService.sendNotification({ email: this.resident.ownerName }).pipe(takeUntil(this._unsubscribeAll)).subscribe((res) => {

      this.onClose();

      if (res == 200) {
        return this._snackbarService.open('Se le ha enviado una notificación al residente.');
      }

      return this._snackbarService.open('Ha ocurrido un error al enviar la notificación al residente.');
    });
  };

  onClose() {
    this.dialogRef.close();
  };

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  };
}