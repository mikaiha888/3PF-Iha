import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [
    {
      courseName: 'Full Stack Development',
      classes: [101, 201]
    },
    {
      courseName: 'Frontend Development',
      classes: [101]
    },
    {
      courseName: 'Backend Developer',
      classes: [101]
    },
    {
      courseName: 'UX Design',
      classes: [101]
    },
    {
      courseName: 'Marketing',
      classes: [101]
    },
    {
      courseName: 'Data Science',
      classes: [101]
    }
  ];

  getCourses() {
    return of(this.courses)
  }
}
