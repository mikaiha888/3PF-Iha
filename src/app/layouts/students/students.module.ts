import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { StudentListHeaderComponent } from './components/student-list-header/student-list-header.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentTableComponent,
    StudentDialogComponent,
    StudentListHeaderComponent,
    StudentListComponent,
    StudentDetailComponent,
  ],
  imports: [CommonModule, StudentsRoutingModule, SharedModule, FormsModule],
  exports: [StudentTableComponent, StudentListHeaderComponent]
})
export class StudentsModule {}
