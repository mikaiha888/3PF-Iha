import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { SharedModule } from '../../shared/shared.module';
import { ClasseDetailComponent } from './pages/classe-detail/classe-detail.component';
import { ClasseDialogComponent } from './components/classe-dialog/classe-dialog.component';

@NgModule({
  declarations: [ClassesComponent, ClasseDetailComponent, ClasseDialogComponent],
  imports: [CommonModule, ClassesRoutingModule, SharedModule],
})
export class ClassesModule {}
