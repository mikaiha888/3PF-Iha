import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../../core/services/courses.service';
import { Course } from '../../../../core/models/course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss',
})
export class CoursePageComponent implements OnInit {
  courses: Course[] = [];
  course: string;

  constructor(private _activatedRoute: ActivatedRoute, private _courses: CoursesService) {
    this.course = this._activatedRoute.snapshot.params['courseName']
  }

  ngOnInit(): void {
    this._courses.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }
}
