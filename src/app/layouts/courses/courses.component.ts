import { Component, OnInit } from '@angular/core';
import { Course } from '../../core/models';
import { CoursesService } from '../../core/services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loading: boolean = true;
  isSortAZ: boolean = true;

  constructor(private _courses: CoursesService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this._courses.getCourses().subscribe({
      next: (courses) => (this.courses = courses),
      error: (error) => console.log(error),
      complete: () => (this.loading = false),
    });
  }

  addCourse() {
    this.matDialog
      .open(CourseDialogComponent)
      .afterClosed()
      .subscribe({
        next: (course) => {
          course && this._courses.createCourse(course).subscribe({
            next: (c) => (this.courses = [...this.courses, c]),
          });
        },
      });
  }

  sortCourses() {
    this.isSortAZ = !this.isSortAZ;
    const sortedCourses = this._courses.sortCourses(
      this.isSortAZ,
      this.courses
    );
    this.courses = [...sortedCourses];
  }
}
