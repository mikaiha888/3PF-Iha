import { Component } from '@angular/core';
import { Admin } from '../../../../core/models';
import { AdminsService } from '../../../../core/services/admins.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminDialogComponent } from '../../components/admin-dialog/admin-dialog.component';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrl: './admin-detail.component.scss'
})
export class AdminDetailComponent {
  admin?: Admin;
  adminId: string;

  constructor(
    private _admins: AdminsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.adminId = this._activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._admins.getAdminById(this.adminId).subscribe({
      next: (admin) => (this.admin = admin),
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  updateAdmin(editingAdmin: Admin): void {
    this.matDialog
      .open(AdminDialogComponent, { data: editingAdmin })
      .afterClosed()
      .subscribe({
        next: (response) => {
          response.id = editingAdmin.id;
          return this._admins.updateAdmin(response).subscribe({
            next: (updatedAdmin) =>
              this.admin && this.admin.id === updatedAdmin.id
                ? updatedAdmin
                : this.admin,
          });
        },
      });
  }

  deleteAdmin(id: string): void {
    if (confirm(`¿Deseas eliminar este estudiante de la lista?`)) {
      this._admins
        .deleteAdmin(id)
        .subscribe(() => this._router.navigate(['admins']));
    }
  }
}
