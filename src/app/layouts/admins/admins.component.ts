import { Component } from '@angular/core';
import { Admin } from '../../core/models';
import { AdminsService } from '../../core/services/admins.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminDialogComponent } from './components/admin-dialog/admin-dialog.component';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss'
})
export class AdminsComponent {
  admins: Admin[] = [];
  loading: boolean = true;
  isSortAZ: boolean = true;

  constructor(
    private _admins: AdminsService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._admins.getAdmins().subscribe({
      next: (admins) => (this.admins = admins),
      error: (error) => console.log(error),
      complete: () => (this.loading = false),
    });
  }

  sortAdmins() {
    this.isSortAZ = !this.isSortAZ;
    const sortedAdmins = this._admins.sortAdmins(this.isSortAZ, this.admins)
    this.admins = [...sortedAdmins];
  }

  addAdmin() {
    this.matDialog
      .open(AdminDialogComponent)
      .afterClosed()
      .subscribe({
        next: (admin) => {
          admin && this._admins.createAdmin(admin).subscribe({
            next: (s) => this.admins = [...this.admins, s],
          });
        },
      });
  }
}
