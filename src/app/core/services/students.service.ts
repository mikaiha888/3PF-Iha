import { Injectable } from '@angular/core';
import { Student } from '../models';
import { Observable, of, delay, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../../layouts/students/components/student-dialog/student-dialog.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private _httpClient: HttpClient, private matDialog: MatDialog) {}

  getStudents(): Observable<Student[]> {
    return this._httpClient
      .get<Student[]>(`${environment.apiBaseUrl}/students`)
      .pipe(delay(1000));
  }

  getStudentById(id: number): Observable<Student | undefined> {
    return this._httpClient
      .get<Student>(`${environment.apiBaseUrl}/students/${id}`)
      .pipe(delay(1000));
  }

  addStudent(): Observable<any> {
    return this.matDialog.open(StudentDialogComponent).afterClosed();
  }

  updateStudent(id: number, editingStudent: Student): Observable<Student> {
    return this._httpClient.put<Student>(
      `${environment.apiBaseUrl}/students/${id}`,
      editingStudent
    );
  }

  deleteStudent(id: number): Observable<Student[]> {
    if (confirm(`¿Deseas eliminar este estudiante de la lista?`)) {
      this._httpClient.delete<Student>(
        `${environment.apiBaseUrl}/students/${id}`
      );
    }
    return this.getStudents();
  }

  sortStudents(isSortAZ: boolean, students: Student[]): Observable<Student[]> {
    const sortedStudents = isSortAZ
      ? students.slice().sort((a, b) => a.firstName.localeCompare(b.firstName))
      : students.slice().sort((a, b) => b.firstName.localeCompare(a.firstName));

    return of(sortedStudents);
  }
}
