import { Injectable } from '@angular/core';
import { Student } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private _httpClient: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this._httpClient
      .get<Student[]>(`${environment.apiBaseUrl}/students`)
      .pipe(delay(1000));
  }

  getStudentById(id: string): Observable<Student | undefined> {
    return this._httpClient
      .get<Student>(`${environment.apiBaseUrl}/students/${id}`)
      .pipe(delay(1000));
  }

  createStudent(student: Student): Observable<Student> {
    return this._httpClient.post<Student>(
      `${environment.apiBaseUrl}/students`,
      student
    );
  }

  updateStudent(student: Student): Observable<Student> {
    return this._httpClient.put<Student>(
      `${environment.apiBaseUrl}/students/${student.id}`,
      student
    );
  }

  deleteStudent(id: string): Observable<Student> {
    return this._httpClient.delete<Student>(
      `${environment.apiBaseUrl}/students/${id}`
    );
  }

  sortStudents(isSortAZ: boolean, students: Student[]): Student[] {
    return isSortAZ
      ? students.slice().sort((a, b) => a.firstName.localeCompare(b.firstName))
      : students.slice().sort((a, b) => b.firstName.localeCompare(a.firstName));
  }
}
