import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { ClasseDetailComponent } from './pages/classe-detail/classe-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ClassesComponent
  },
  {
    path: ':courseName/:classeId',
    component: ClasseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
