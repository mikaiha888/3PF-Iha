import { Component, Input } from '@angular/core';
import { Course } from '../../../../core/models';
import { CoursesService } from '../../../../core/services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent {
  @Input() courses: any[] = [];

  constructor(private _courses: CoursesService, private matDialog: MatDialog) {}

  editCourse(editingCourse: Course) {
    this.matDialog
      .open(CourseDialogComponent, { data: editingCourse })
      .afterClosed()
      .subscribe({
        next: (response) => {
          response.id = editingCourse.id
          this._courses.updateCourse(response).subscribe({
            next: (updatedCourse) =>
              (this.courses = this.courses.map((course) =>
                course.id === updatedCourse.id ? updatedCourse : course
              )),
          })},
      });
  }

  deleteCourse(id: string) {
    if (confirm(`¿Deseas eliminar este curso de la lista?`)) {
      this._courses.deleteCourse(id).subscribe((deletedCourse) => {
        this.courses = this.courses.filter((c) => deletedCourse.id !== c.id);
      });
    }
  }
}
