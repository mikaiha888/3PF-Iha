import { Component, Input } from '@angular/core';
import { Admin, Course, User } from '../../../../core/models';
import { MatDialog } from '@angular/material/dialog';
import { AdminsService } from '../../../../core/services/admins.service';
import { AdminDialogComponent } from '../admin-dialog/admin-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss'
})
export class AdminTableComponent {
  @Input() admins: Admin[] = [];
  @Input() courses: Course[] = [];

  authUser$: Observable<User | null>;
  displayedColumns: string[] = [
    'fullName',
    'email',
    'course',
    'createdAt',
    'actions',
  ];

  constructor(
    private _admins: AdminsService,
    private _auth: AuthService,
    private matDialog: MatDialog
  ) {
    this.authUser$ = this._auth.authUser;
  }

  updateAdmin(editingAdmin: Admin): void {
    this.matDialog
      .open(AdminDialogComponent, { data: editingAdmin })
      .afterClosed()
      .subscribe({
        next: (response) =>{
          response.id = editingAdmin.id
          return this._admins.updateAdmin(response).subscribe({
            next: (updatedAdmin) =>
              (this.admins = this.admins.map((admin) =>
                admin.id === updatedAdmin.id ? updatedAdmin : admin
              )),
          })}
      });
  }

  deleteAdmin(id: string): void {
    if (confirm(`¿Deseas eliminar este administrador de la lista?`)) {
      this._admins.deleteAdmin(id).subscribe((deletedAdmin) => {
        this.admins = this.admins.filter((s) => deletedAdmin.id !== s.id);
      });
    }
  }
}
