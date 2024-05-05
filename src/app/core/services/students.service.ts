import { Injectable } from '@angular/core';
import { Student } from '../models';
import { Observable, of, delay, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../../layouts/students/components/student-dialog/student-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private matDialog: MatDialog) {}

  private students: Student[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      cel: 1234567891,
      createdAt: new Date(),
      course: {
        courseId: 1,
        name: 'Full Stack Development',
        classNumber: 101,
        isApproved: true,
      },
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      cel: 9876543211,
      createdAt: new Date(),
      course: {
        courseId: 2,
        name: 'Frontend Development',
        classNumber: 101,
        isApproved: true,
      },
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      cel: 5555555551,
      createdAt: new Date(),
      course: {
        courseId: 5,
        name: 'Marketing',
        classNumber: 101,
        isApproved: true,
      },
    },
    {
      id: 4,
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'bob.brown@example.com',
      cel: 1111111111,
      createdAt: new Date(),
      course: {
        courseId: 1,
        name: 'Full Stack Development',
        classNumber: 101,
        isApproved: true,
      },
    },
    {
      id: 5,
      firstName: 'Eva',
      lastName: 'Lee',
      email: 'eva.lee@example.com',
      cel: 9999999991,
      createdAt: new Date(),
      course: {
        courseId: 4,
        name: 'UX Design',
        classNumber: 101,
        isApproved: true,
      },
    },
  ];

  getStudents(): Observable<Student[]> {
    return of(this.students).pipe(delay(1000));
  }

  getStudentsByClass(
    course: string,
    classNumber: number
  ): Observable<Student[]> {
    return this.getStudents().pipe(
      map((students: Student[]) =>
        students.filter(
          (student) =>
            student.course.classNumber === classNumber && student.course.name === course
        )
      )
    );
  }

  getStudentById(id: number): Observable<Student | undefined> {
    return this.getStudents().pipe(
      map((students) => students.find((student) => student.id == id))
    );
  }

  addStudent(): Observable<any> {
    return this.matDialog.open(StudentDialogComponent).afterClosed();
  }

  updateStudent(editingStudent: Student): Observable<any> {
    return this.matDialog
      .open(StudentDialogComponent, { data: editingStudent })
      .afterClosed();
  }

  deleteStudent(id: number): Observable<Student[]> {
    if (confirm(`¿Deseas eliminar este estudiante de la lista?`)) {
      this.students = this.students.filter((s) => s.id !== id);
    }
    return of(this.students);
  }

  sortStudents(isSortAZ: boolean, students: Student[]): Observable<Student[]> {
    const sortedStudents = isSortAZ
      ? students.slice().sort((a, b) => a.firstName.localeCompare(b.firstName))
      : students.slice().sort((a, b) => b.firstName.localeCompare(a.firstName));

    return of(sortedStudents);
  }
}
