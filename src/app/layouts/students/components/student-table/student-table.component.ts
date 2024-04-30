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
    'isApproved',
    'createdAt',
    'actions',
  ];


  constructor(private _students: StudentsService) {}

  openDialog(editingStudent: Student): void {
    this._students.openDialog(editingStudent).subscribe({
      next: (response) => {
        this.students = this.students.map((student) => 
          student.id === editingStudent.id 
            ? { ...student, ...response}
            : student
        );
      },
    });
  }

  onDelete(id: number): void {
    this._students.onDelete(id).subscribe((updatedStudents) => {
      this.students = updatedStudents;
    });
  }
}
