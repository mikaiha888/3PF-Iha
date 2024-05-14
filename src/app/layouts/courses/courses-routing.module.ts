import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { ClasseDetailComponent } from '../classes/pages/classe-detail/classe-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  {
    path: ':courseName',
    component: CourseDetailComponent,
  },
  {
    path: ':courseName/:classNumber',
    component: ClasseDetailComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'all'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
