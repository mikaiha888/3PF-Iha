import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { CourseClassPageComponent } from './pages/courses-class-page/course-class-page.component';
import { CourseClassListPageComponent } from './pages/course-class-list-page/course-class-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: CoursePageComponent
  },
  {
    path: ':courseName',
    component: CourseClassPageComponent,
  },
  {
    path: ':courseName/:classNumber',
    component: CourseClassListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
