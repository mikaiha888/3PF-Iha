import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';

@NgModule({
  declarations: [CoursesComponent, CourseDetailComponent, CourseListComponent, CourseDialogComponent],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
})
export class CoursesModule {}
