import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAlert, User } from 'app/interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  public newUser: boolean = true;
  public userForm: FormGroup; 
  public alert: IAlert;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.newUser = true;
    this.userForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName:  ['', [Validators.required]],
      role:      ['', [Validators.required]],
      email:     ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required]],
    })
  }

  setForm(user: User) {
    this.newUser = false;
    this.userForm.patchValue({
      firstName: [user.DisplayName, Validators.required],
      lastName:  [user.DisplayName, Validators.required],
      role:      [user.Role, Validators.required],
      email:     [user.Email, [Validators.required, Validators.email]],
      password:  [''],
    })
  }

  createUser() {
    if (this.userForm.invalid) return Object.values(this.userForm.controls).forEach(c => c.markAsTouched());

    
    this._userService.createUser(this.userForm.value).subscribe(res => {

      if (res == 200) {
        this.alert = {
          type: 'success',
          message: 'El usuario ha sido creado exitósamente'
        };
      }

      this.alert = {
        type: 'error',
        message: 'Ha ocurrido un error al crear el usuario.'
      };

      this.onCancel();
      return;

    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
