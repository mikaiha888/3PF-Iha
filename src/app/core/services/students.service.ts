import { Injectable } from '@angular/core';
import { Student } from '../models';
import { Observable, of, delay, filter, map } from 'rxjs';
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
      firstName: 'David',
      lastName: 'Martinez',
      email: 'david.martinez@example.com',
      cel: 1234567890,
      createdAt: new Date('2022-04-08'),
      course: 'Frontend Development',
      classNumber: 101,
      isApproved: true,
    },
    {
      id: 2,
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.brown@example.com',
      cel: 9876543210,
      createdAt: new Date('2022-04-09'),
      course: 'Data Science',
      classNumber: 101,
      isApproved: true,
    },
    {
      id: 3,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      cel: 4567891230,
      createdAt: new Date('2022-04-11'),
      course: 'Full Stack Development',
      classNumber: 101,
      isApproved: true,
    },
    {
      id: 4,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      cel: 7891234560,
      createdAt: new Date('2022-04-12'),
      course: 'Backend Developer',
      classNumber: 101,
      isApproved: true,
    },
    {
      id: 5,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
      cel: 6543217890,
      createdAt: new Date('2022-04-10'),
      course: 'Frontend Development',
      classNumber: 101,
      isApproved: false,
    },
    {
      id: 6,
      firstName: 'Ana',
      lastName: 'Gonzalez',
      email: 'ana.gonzalez@example.com',
      cel: 2013456789,
      createdAt: new Date('2022-04-15'),
      course: 'Marketing',
      classNumber: 101,
      isApproved: true,
    },
    {
      id: 7,
      firstName: 'Pedro',
      lastName: 'Ramirez',
      email: 'pedro.ramirez@example.com',
      cel: 6098475321,
      createdAt: new Date('2022-04-18'),
      course: 'Data Science',
      classNumber: 101,
      isApproved: true,
    },
    {
      id: 8,
      firstName: 'Sofia',
      lastName: 'Fernandez',
      email: 'sofia.fernandez@example.com',
      cel: 1239874560,
      createdAt: new Date('2022-04-20'),
      course: 'UX Design',
      classNumber: 101,
      isApproved: false,
    },
    {
      id: 9,
      firstName: 'Javier',
      lastName: 'Sanchez',
      email: 'javier.sanchez@example.com',
      cel: 7892013456,
      createdAt: new Date('2022-04-22'),
      course: 'Full Stack Development',
      classNumber: 101,
      isApproved: true,
    },
    {
      id: 10,
      firstName: 'Luisa',
      lastName: 'Perez',
      email: 'luisa.perez@example.com',
      cel: 4562017893,
      createdAt: new Date('2022-04-25'),
      course: 'Full Stack Development',
      classNumber: 201,
      isApproved: true,
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
            student.classNumber === classNumber && student.course === course
        )
      )
    );
  }

  getStudentsById(id: number): Observable<Student | undefined> {
    const result = this.getStudents().pipe(
      map((students) =>
        students.find((student) => student.id == id)
      )
    );
    return result
  }

  openDialog(editingStudent?: Student): Observable<any> {
    return this.matDialog
      .open(StudentDialogComponent, { data: editingStudent })
      .afterClosed();
  }

  onDelete(id: number): Observable<Student[]> {
    if (confirm(`¿Deseas eliminar este estudiante e la lista?`)) {
      this.students = this.students.filter((student) => student.id !== id);
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
