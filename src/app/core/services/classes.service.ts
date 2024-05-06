import { Injectable } from '@angular/core';
import { Classe } from '../models';
import { Observable, delay, map, of } from 'rxjs';
import { ClassDialogComponent } from '../../layouts/classes/components/class-dialog/class-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  getClassById(studentId: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private matDialog: MatDialog) {}
  private classes: Classe[] = [
    {
      id: 1,
      courseId: 1,
      classNumber: 101,
      day: ['monday', 'tuesday', 'wednesday'],
      startTime: '10:00',
      endTime: '11:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
    {
      id: 2,
      courseId: 2,
      classNumber: 101,
      day: ['monday', 'wednesday', 'friday'],
      startTime: '14:00',
      endTime: '15:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
    {
      id: 3,
      courseId: 3,
      classNumber: 101,
      day: ['tuesday', 'thursday'],
      startTime: '13:00',
      endTime: '14:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
    {
      id: 4,
      courseId: 4,
      classNumber: 101,
      day: ['monday', 'wednesday'],
      startTime: '11:00',
      endTime: '12:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
    {
      id: 5,
      courseId: 5,
      classNumber: 101,
      day: ['tuesday', 'thursday'],
      startTime: '15:00',
      endTime: '16:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
    {
      id: 6,
      courseId: 6,
      classNumber: 101,
      day: ['monday', 'wednesday'],
      startTime: '10:00',
      endTime: '11:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
  ];

  getClasses(): Observable<Classe[]> {
    return of(this.classes);
  }

  getClasseById(id: number): Observable<Classe | undefined> {
    return this.getClasses().pipe(
      map((classes) => classes.find((classe) => classe.id == id))
    );
  }

  getClassesByCourse(courseId: number): Observable<Classe[]> {
    return this.getClasses().pipe(
      map((classes) => classes.filter((c) => c.courseId == courseId))
    );
  }

  addClasse(): Observable<any> {
    return this.matDialog.open(ClassDialogComponent).afterClosed();
  }

  updateClasse(editingClasse: Classe): Observable<any> {
    return this.matDialog
      .open(ClassDialogComponent, { data: editingClasse })
      .afterClosed();
  }

  deleteClasse(id: number): Observable<Classe[]> {
    if (confirm(`¿Deseas eliminar esta clase de la lista?`)) {
      this.classes = this.classes.filter((c) => c.id !== id);
    }
    return of(this.classes);
  }

  sortClasses(isSortAZ: boolean, students: Classe[]): Observable<Classe[]> {
    const sortedClasses = isSortAZ
      ? students.slice().sort((a, b) => a.classNumber - b.classNumber)
      : students.slice().sort((a, b) => b.classNumber - a.classNumber);

    return of(sortedClasses);
  }
}
