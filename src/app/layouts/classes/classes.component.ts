import { Component } from '@angular/core';
import { ClassesService } from '../../core/services/classes.service';
import { Classe } from '../../core/models';
import { MatDialog } from '@angular/material/dialog';
import { ClasseDialogComponent } from './components/classe-dialog/classe-dialog.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
})
export class ClassesComponent {
  classes: Classe[] = [];
  isSortAZ: boolean = true;

  constructor(private _classes: ClassesService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this._classes.getClasses().subscribe({
      next: (classes) => {
        this.classes = classes;
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  createClasse() {
    this.matDialog
      .open(ClasseDialogComponent)
      .afterClosed()
      .subscribe({
        next: (classe) => {
          classe &&
            this._classes.createClasse(classe).subscribe({
              next: (c) => (this.classes = [...this.classes, c]),
            });
        },
      });
  }

  deleteClasse(id: string): void {
    if (confirm(`¿Deseas eliminar esta clase de la lista?`)) {
      this._classes.deleteClasse(id).subscribe((deletedClasse) => {
        this.classes = this.classes.filter((s) => deletedClasse.id !== s.id);
      });
    }
  }
}
