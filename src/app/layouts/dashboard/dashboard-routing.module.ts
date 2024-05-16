import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'courses',
    loadChildren: () => import('../courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'classes',
    loadChildren: () => import('../classes/classes.module').then((m) => m.ClassesModule),
  },
  {
    path: 'students',
    loadChildren: () => import('../students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'admins',
    canActivate: [adminGuard],
    loadChildren: () => import('../admins/admins.module').then((m) => m.AdminsModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
