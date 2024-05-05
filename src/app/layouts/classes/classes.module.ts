import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassDetailComponent } from './pages/class-detail/class-detail.component';
import { ClassDialogComponent } from './components/class-dialog/class-dialog.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ClassesComponent,
    ClassDetailComponent,
    ClassDialogComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    SharedModule
  ]
})
export class ClassesModule { }
