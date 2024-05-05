import { Injectable } from '@angular/core';
import { Class } from '../models';
import { Observable, delay, map, of } from 'rxjs';
import { ClassDialogComponent } from '../../layouts/classes/components/class-dialog/class-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private matDialog: MatDialog) {}
  private classes: Class[] = [
    {
      id: 1,
      courseId: 1,
      classNumber: 101,
      day: { monday: true, tuesday: true, wednesday: true },
      time: '10:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
    {
      id: 2,
      courseId: 2,
      classNumber: 101,
      day: { monday: true, wednesday: true, friday: true },
      time: '14:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
    {
      id: 3,
      courseId: 3,
      classNumber: 101,
      day: { tuesday: true, thursday: true },
      time: '13:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
    {
      id: 4,
      courseId: 4,
      classNumber: 101,
      day: { monday: true, wednesday: true },
      time: '11:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
    {
      id: 5,
      courseId: 5,
      classNumber: 101,
      day: { tuesday: true, thursday: true },
      time: '15:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
    {
      id: 6,
      courseId: 6,
      classNumber: 101,
      day: { monday: true, wednesday: true },
      time: '10:00',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2024-12-31'),
      students: [],
    },
  ];

  getClasses(): Observable<Class[]> {
    return of(this.classes);
  }

  getClassByCourse(courseId: number): Observable<Class[]> {
    return this.getClasses().pipe(
      map((classes) => classes.filter((c) => c.courseId == courseId))
    );
  }
    
  addClass(): Observable<any> {
    return this.matDialog.open(ClassDialogComponent).afterClosed();
  }

  updateClass(editingClass: Class): Observable<any> {
    return this.matDialog
      .open(ClassDialogComponent, { data: editingClass })
      .afterClosed();
  }

  deleteClass(id: number): Observable<Class[]> {
    if (confirm(`¿Deseas eliminar esta clase de la lista?`)) {
      this.classes = this.classes.filter((c) => c.id !== id);
    }
    return of(this.classes);
  }
  
  sortClasses(isSortAZ: boolean, students: Class[]): Observable<Class[]> {
    const sortedClasses = isSortAZ
      ? students.slice().sort((a, b) => a.classNumber - b.classNumber)
      : students.slice().sort((a, b) => b.classNumber - a.classNumber);

    return of(sortedClasses);
  }
}
