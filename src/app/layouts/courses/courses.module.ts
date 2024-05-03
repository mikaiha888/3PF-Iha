import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CourseClassPageComponent } from './pages/courses-class-page/course-class-page.component';
import { CourseClassListPageComponent } from './pages/course-class-list-page/course-class-list-page.component';
import { SharedModule } from '../../shared/shared.module';
import { StudentsModule } from '../students/students.module';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseClassPageComponent,
    CourseClassListPageComponent,
    CourseDialogComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    StudentsModule
  ]
})
export class CoursesModule { }
