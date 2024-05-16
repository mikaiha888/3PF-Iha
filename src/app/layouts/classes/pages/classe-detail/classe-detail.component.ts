import { Component, OnInit } from '@angular/core';
import { Classe, User } from '../../../../core/models';
import { ClassesService } from '../../../../core/services/classes.service';
import { MatDialog } from '@angular/material/dialog';
import { ClasseDialogComponent } from '../../components/classe-dialog/classe-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-classe-detail',
  templateUrl: './classe-detail.component.html',
  styleUrl: './classe-detail.component.scss',
})
export class ClasseDetailComponent implements OnInit {
  classe?: Classe;
  courseName?: string;
  classNumber?: number;
  authUser$: Observable<User | null>;

  constructor(
    private _classes: ClassesService,
    private _auth: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.authUser$ = this._auth.authUser;
    this.courseName = this.capitalizeCourseName(this._router.url);
    this.classNumber = Number(this._router.url.split('/')[3])

    this._classes.getClasse(this.courseName, this.classNumber).subscribe({next: (classe) => this.classe = classe})
  }

  ngOnInit(): void {}

  updateClasse(editingClasse: Classe): void {
    this.matDialog
      .open(ClasseDialogComponent, { data: editingClasse })
      .afterClosed()
      .subscribe({
        next: (response) => {
          response.id = editingClasse.id;
          return this._classes.updateClasse(response).subscribe({
            next: (updatedClasse) =>
              this.classe && this.classe.id === updatedClasse.id
                ? updatedClasse
                : this.classe,
          });
        },
      });
  }

  deleteClasse(id: string): void {
    if (confirm(`¿Deseas eliminar este estudiante de la lista?`)) {
      this._classes
        .deleteClasse(id)
        .subscribe(() => this._router.navigate(['classes']));
    }
  }

  capitalizeCourseName(str: string): string {
    return str
      .split('/')[2]
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
