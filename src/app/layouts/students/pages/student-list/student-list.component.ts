import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../core/models';
import { StudentsService } from '../../../../core/services/students.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading: boolean = true;
  isSortAZ: boolean = true;

  constructor(private _students: StudentsService) {}

  ngOnInit(): void {
    this._students.getStudents().subscribe({
      next: (students) => this.students = students,
      error: (error) => console.log(error),
      complete: () => this.loading = false
    });
  }

  sortStudents() {
    this.isSortAZ = !this.isSortAZ;
    this._students.sortStudents(this.isSortAZ, this.students).subscribe({
      next: (sortedStudents) => this.students = [...sortedStudents],
      complete: () => {}
    });
  }

  openDialog() {
    this._students.openDialog().subscribe({
      next: (response) => {
        response.id = this.students[this.students.length - 1].id + 1;
        response.createdAt = new Date();
        console.log(response);
        this.students = [...this.students, response];       
      },
    });
  }
}
