import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseDialogComponent,
    CourseDetailComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
  ]
})
export class CoursesModule { }
