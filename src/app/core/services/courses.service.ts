import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, of } from 'rxjs';
import { CourseDialogComponent } from '../../layouts/courses/components/course-dialog/course-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private matDialog: MatDialog) {}

  private courses: Course[] = [
    {
      id: 1,
      name: 'Full Stack Development',
      difficulty: 'Intermediate',
      description: 'Aprende a desarrollar software tanto del lado del cliente como del servidor.',
      classesId: [],
    },
    {
      id: 2,
      name: 'Frontend Development',
      difficulty: 'Pre-intermediate',
      description: 'Enfoque en desarrollar interfaces de usuario y experiencias para la web.',
      classesId: [],
    },
    {
      id: 3,
      name: 'Backend Development',
      difficulty: 'Intermediate',
      description: 'Aprende a construir y mantener el lado del servidor de aplicaciones web.',
      classesId: [],
    },
    {
      id: 4,
      name: 'UX Design',
      difficulty: 'Upper-intermediate',
      description: 'Enfoque en crear experiencias de usuario intuitivas y atractivas.',
      classesId: [],
    },
    {
      id: 5,
      name: 'Marketing',
      difficulty: 'Pre-intermediate',
      description: 'Aprende estrategias para promocionar productos o servicios.',
      classesId: [],
    },
    {
      id: 6,
      name: 'Data Science',
      difficulty: 'Advanced',
      description: 'Estudia y analiza grandes conjuntos de datos para extraer información valiosa.',
      classesId: [],
    },
  ];

  getCourses() {
    return of(this.courses);
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.getCourses().pipe(
      map((courses) => courses.find((course) => course.id == id))
    );
  }
  
  addCourse(): Observable<any> {
    return this.matDialog.open(CourseDialogComponent).afterClosed();
  }

  updateCourse(editingCourse: Course): Observable<any> {
    return this.matDialog
      .open(CourseDialogComponent, { data: editingCourse })
      .afterClosed();
  }

  deleteCourse(id: number): Observable<Course[]> {
    if (confirm(`¿Deseas eliminar este curso de la lista?`)) {
      this.courses = this.courses.filter((c) => c.id !== id);
    }
    return of(this.courses);
  }

  sortCourses(isSortAZ: boolean, students: Course[]): Observable<Course[]> {
    const sortedCourses = isSortAZ
      ? students.slice().sort((a, b) => a.name.localeCompare(b.name))
      : students.slice().sort((a, b) => b.name.localeCompare(a.name));

    return of(sortedCourses);
  }
}
