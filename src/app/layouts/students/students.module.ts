import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentDetailComponent,
    StudentTableComponent,
    StudentDialogComponent,
  ],
  imports: [CommonModule, StudentsRoutingModule, SharedModule, FormsModule],
})
export class StudentsModule {}
