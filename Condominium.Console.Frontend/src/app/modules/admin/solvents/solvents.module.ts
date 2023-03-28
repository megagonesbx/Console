import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolventsRoutingModule } from './solvents-routing.module';
import { SolventsComponent } from './solvents.component';


@NgModule({
  declarations: [
    SolventsComponent
  ],
  imports: [
    CommonModule,
    SolventsRoutingModule
  ]
})
export class SolventsModule { }
