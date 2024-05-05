import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./layouts/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./layouts/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'courses',
    loadChildren: () => import('./layouts/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'classes',
    loadChildren: () => import('./layouts/classes/classes.module').then((m) => m.ClassesModule),
  },
  {
    path: 'students',
    loadChildren: () => import('./layouts/students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'inscriptions',
    loadChildren: () => import('./layouts/inscrptions/inscrptions.module').then((m) => m.InscrptionsModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
