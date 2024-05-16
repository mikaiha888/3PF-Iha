import { Component } from '@angular/core';
import { Course, User } from '../../../../core/models';
import { CoursesService } from '../../../../core/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../../components/course-dialog/course-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {
  course?: Course;
  courseName: string;
  authUser$: Observable<User | null>;

  constructor(
    private _courses: CoursesService,
    private _auth: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.authUser$ = this._auth.authUser;
    this.courseName = this._activatedRoute.snapshot.params['courseName']
      .split('-')
      .map((word: string) => this.capitalizeString(word))
      .join(' ');
  }

  ngOnInit(): void {
    this._courses.getCourseByName(this.courseName).subscribe({
      next: (course) => (this.course = course),
    });
  }

  updateCourse(editingCourse: Course): void {
    this.matDialog
      .open(CourseDialogComponent, { data: editingCourse })
      .afterClosed()
      .subscribe({
        next: (response) => {
          response.id = editingCourse.id;
          return this._courses.updateCourse(response).subscribe({
            next: (updatedCourse) =>
              this.course && this.course.id === updatedCourse.id
                ? updatedCourse
                : this.course,
          });
        },
      });
  }

  deleteCourse(id: string): void {
    if (confirm(`¿Deseas eliminar este estudiante de la lista?`)) {
      this._courses
        .deleteCourse(id)
        .subscribe(() => this._router.navigate(['courses']));
    }
  }

  capitalizeString(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
