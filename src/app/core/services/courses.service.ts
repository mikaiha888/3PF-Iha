import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Course } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private _httpClient: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this._httpClient.get<Course[]>(`${environment.apiBaseUrl}/courses`);
  }

  getCourseById(id: number): Observable<Course> {
    return this._httpClient.get<Course>(
      `${environment.apiBaseUrl}/courses/${id}`
    );
  }

  getCourseByName(courseName: string): Observable<Course | undefined> {
    return this.getCourses().pipe(
      map((courses) => courses.find((course) => course.name === courseName))
    );
  }

  createCourse(course: Course): Observable<Course> {
    return this._httpClient.post<Course>(
      `${environment.apiBaseUrl}/courses`,
      course
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this._httpClient.put<Course>(
      `${environment.apiBaseUrl}/courses/${course.id}`,
      course
    );
  }

  deleteCourse(id: string): Observable<Course> {
    return this._httpClient.delete<Course>(
      `${environment.apiBaseUrl}/courses/${id}`
    );
  }

  sortCourses(isSortAZ: boolean, courses: Course[]): Course[] {
    return isSortAZ
      ? courses.slice().sort((a, b) => a.name.localeCompare(b.name))
      : courses.slice().sort((a, b) => b.name.localeCompare(a.name));
  }
}
