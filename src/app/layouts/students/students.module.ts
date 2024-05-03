import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentTableComponent,
    StudentDialogComponent,
    StudentsComponent,
    StudentDetailComponent,
  ],
  imports: [CommonModule, StudentsRoutingModule, SharedModule, FormsModule],
  exports: [StudentTableComponent]
})
export class StudentsModule {}
