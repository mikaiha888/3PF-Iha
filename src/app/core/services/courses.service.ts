import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { Observable, delay } from 'rxjs';
import { CourseDialogComponent } from '../../layouts/courses/components/course-dialog/course-dialog.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private _httpClient: HttpClient, private matDialog: MatDialog) {}

  getCourses(): Observable<Course[]> {
    return this._httpClient.get<Course[]>(`${environment}/courses`);
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this._httpClient
      .get<Course>(`${environment.apiBaseUrl}/courses/${id}`)
      .pipe(delay(1000));
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
      this._httpClient.delete<Course>(
        `${environment.apiBaseUrl}/courses/${id}`
      );
    }
    return this.getCourses();
  }

  sortCourses(isSortAZ: boolean, students: Course[]): Observable<Course[]> {
    const sortedCourses = isSortAZ
      ? students.slice().sort((a, b) => a.name.localeCompare(b.name))
      : students.slice().sort((a, b) => b.name.localeCompare(a.name));

    return this.getCourses();
  }
}
