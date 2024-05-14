import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../../core/services/students.service';
import { Student } from '../../../../core/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent implements OnInit {
  student: Student | undefined = undefined;
  studentId: number;

  constructor(
    private _students: StudentsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
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
    this._students.updateStudent(editingStudent.id, editingStudent).subscribe({
      next: (response) => {
        this.student = {
          ...this.student,
          ...response,
        };
      },
    });
  }

  deleteStudent(id: number): void {
    this._students.deleteStudent(id).subscribe(() => this._router.navigate(['students'])
    );
  }
}
