import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'app/modules/auth/admin.guard';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AdminGuard],
    component: UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
