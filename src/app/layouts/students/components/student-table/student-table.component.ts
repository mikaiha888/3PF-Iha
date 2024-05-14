import { Component, Input } from '@angular/core';
import { Course, Student } from '../../../../core/models';
import { StudentsService } from '../../../../core/services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss',
})
export class StudentTableComponent {
  @Input() students: Student[] = [];
  @Input() courses: Course[] = [];

  displayedColumns: string[] = [
    'fullName',
    'email',
    'coursesEnrrolled',
    'createdAt',
    'actions',
  ];

  constructor(
    private _students: StudentsService,
    private _courses: CoursesService,
    private matDialog: MatDialog
  ) {}

  getCourseName(id: number): string {
    console.log(id);
    
    const course = this.courses.find(c => c.id === id) ? this.courses.find(c => c.id === id) : '';
    return course ? course.name : '';
  }
 
  updateStudent(editingStudent: Student): void {
    this.matDialog
      .open(StudentDialogComponent, { data: editingStudent })
      .afterClosed()
      .subscribe({
        next: (response) => {
          response.id = editingStudent.id;
          response.createdAt = editingStudent.createdAt;
          this._students.updateStudent(editingStudent.id, response).subscribe();
        },
      });
  }

  deleteStudent(id: number): void {
    this._students.deleteStudent(id).subscribe((updatedStudents) => {
      this.students = updatedStudents;
    });
  }
}
