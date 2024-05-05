import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../core/models';
import { CoursesService } from '../../../../core/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined = undefined;
  courseId: number;

  constructor(
    private _courses: CoursesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.courseId = this._activatedRoute.snapshot.params['courseId'];
  }

  ngOnInit(): void {
    this._courses.getCourseById(this.courseId).subscribe({
      next: (course) => (this.course = course),
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  updateCourse(editingCourses: Course): void {
    this._courses.updateCourse(editingCourses).subscribe({
      next: (response) => {
        this.course = {
          ...this.course,
          ...response,
        };
      },
    });
  }

  deleteCourse(id: number): void {
    this._courses
      .deleteCourse(id)
      .subscribe(() => this._router.navigate(['courses']));
  }
}
