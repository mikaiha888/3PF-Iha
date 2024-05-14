import { Component } from '@angular/core';
import { Student } from '../../core/models';
import { StudentsService } from '../../core/services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  students: Student[] = [];
  loading: boolean = true;
  isSortAZ: boolean = true;

  constructor(
    private _students: StudentsService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._students.getStudents().subscribe({
      next: (students) => (this.students = students),
      error: (error) => console.log(error),
      complete: () => (this.loading = false),
    });
  }

  sortStudents() {
    this.isSortAZ = !this.isSortAZ;
    const sortedStudents = this._students.sortStudents(this.isSortAZ, this.students)
    this.students = [...sortedStudents];
  }

  addStudent() {
    this.matDialog
      .open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (student) => {
          student && this._students.createStudent(student).subscribe({
            next: (s) => this.students = [...this.students, s],
          });
        },
      });
  }
}
