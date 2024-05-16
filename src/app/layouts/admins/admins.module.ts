import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminsComponent } from './admins.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AdminTableComponent } from './components/admin-table/admin-table.component';
import { AdminDialogComponent } from './components/admin-dialog/admin-dialog.component';
import { AdminDetailComponent } from './pages/admin-detail/admin-detail.component';

@NgModule({
  declarations: [
    AdminsComponent,
    AdminTableComponent,
    AdminDialogComponent,
    AdminDetailComponent,
  ],
  imports: [CommonModule, AdminsRoutingModule, SharedModule, FormsModule],
})
export class AdminsModule {}
