import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../../core/models';
import { StudentsService } from '../../../../core/services/students.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrl: './student-table.component.scss',
})
export class StudentTableComponent {
  @Input() students: Student[] = [];

  displayedColumns: string[] = [
    'fullName',
    'email',
    'courses',
    'createdAt',
    'actions',
  ];


  constructor(private _students: StudentsService) {}

  updateStudent(editingStudent: Student): void {
    this._students.updateStudent(editingStudent).subscribe({
      next: (response) => {
        this.students = this.students.map((student) => 
          student.id === editingStudent.id 
            ? { ...student, ...response, course: {
              courseId: response.course.id,
              name: response.course.name,
              classNumber: response.classNumber,
              isApproved: response.isApproved,
            }}
            : student
        );
      },
    });
  }

  deleteStudent(id: number): void {
    this._students.deleteStudent(id).subscribe((updatedStudents) => {
      this.students = updatedStudents;
    });
  }
}
