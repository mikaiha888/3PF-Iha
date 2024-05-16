import { Component } from '@angular/core';
import { ClassesService } from '../../core/services/classes.service';
import { Classe, Course } from '../../core/models';
import { MatDialog } from '@angular/material/dialog';
import { ClasseDialogComponent } from './components/classe-dialog/classe-dialog.component';
import { CoursesService } from '../../core/services/courses.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
})
export class ClassesComponent {
  classes: Classe[] = [];
  coursesWithClass: Course[] = [];
  isSortAZ: boolean = true;

  constructor(
    private _classes: ClassesService,
    private _courses: CoursesService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._classes.getClasses().subscribe({
      next: (classes) => {
        this.classes = classes;
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
    this._courses.getCourses().subscribe({
      next: (courses) => this.coursesWithClass = courses.filter(course => course.classes.length)
    })
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
