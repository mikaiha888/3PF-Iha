import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins.component';
import { AdminDetailComponent } from './pages/admin-detail/admin-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminsComponent
  },
  {
    path: ':id',
    component: AdminDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
