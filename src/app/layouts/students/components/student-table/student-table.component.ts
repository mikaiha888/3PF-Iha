import { Component, Input } from '@angular/core';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentsService } from '../../../../core/services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { Course, Student } from '../../../../core/models';

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
    'course',
    'createdAt',
    'actions',
  ];

  constructor(
    private _students: StudentsService,
    private matDialog: MatDialog
  ) {}

  updateStudent(editingStudent: Student): void {
    this.matDialog
      .open(StudentDialogComponent, { data: editingStudent })
      .afterClosed()
      .subscribe({
        next: (response) =>{
          response.id = editingStudent.id
          return this._students.updateStudent(response).subscribe({
            next: (updatedStudent) =>
              (this.students = this.students.map((student) =>
                student.id === updatedStudent.id ? updatedStudent : student
              )),
          })}
      });
  }

  deleteStudent(id: string): void {
    if (confirm(`¿Deseas eliminar este estudiante de la lista?`)) {
      this._students.deleteStudent(id).subscribe((deletedStudent) => {
        this.students = this.students.filter((s) => deletedStudent.id !== s.id);
      });
    }
  }
}
