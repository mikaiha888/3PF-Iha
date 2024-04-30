import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { CourseClassPageComponent } from './pages/courses-class-page/course-class-page.component';
import { CourseClassListPageComponent } from './pages/course-class-list-page/course-class-list-page.component';
import { SharedModule } from '../../shared/shared.module';
import { StudentsModule } from '../students/students.module';


@NgModule({
  declarations: [
    CoursePageComponent,
    CourseClassPageComponent,
    CourseClassListPageComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    StudentsModule
  ]
})
export class CoursesModule { }
