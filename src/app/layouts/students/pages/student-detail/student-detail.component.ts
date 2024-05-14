import { Component } from '@angular/core';
import { Student } from '../../../../core/models';
import { StudentsService } from '../../../../core/services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../../components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent {
  student?: Student;
  studentId: string;

  constructor(
    private _students: StudentsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.studentId = this._activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._students.getStudentById(this.studentId).subscribe({
      next: (student) => (this.student = student),
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  updateStudent(editingStudent: Student): void {
    this.matDialog
      .open(StudentDialogComponent, { data: editingStudent })
      .afterClosed()
      .subscribe({
        next: (response) => {
          response.id = editingStudent.id;
          return this._students.updateStudent(response).subscribe({
            next: (updatedStudent) =>
              this.student && this.student.id === updatedStudent.id
                ? updatedStudent
                : this.student,
          });
        },
      });
  }

  deleteStudent(id: string): void {
    if (confirm(`¿Deseas eliminar este estudiante de la lista?`)) {
      this._students
        .deleteStudent(id)
        .subscribe(() => this._router.navigate(['students']));
    }
  }
}
