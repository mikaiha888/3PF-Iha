import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesService } from '../../../../core/services/classes.service';
import { Classe, Course, Student } from '../../../../core/models';
import { CoursesService } from '../../../../core/services/courses.service';
import { StudentsService } from '../../../../core/services/students.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrl: './class-detail.component.scss',
})
export class ClassDetailComponent implements OnInit {
  classe: Classe | undefined = undefined;
  course: Course | undefined = undefined;
  classId: number;
  students: Student[] = [];

  constructor(
    private _classes: ClassesService,
    private _courses: CoursesService,
    private _students: StudentsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.classId = this._activatedRoute.snapshot.params['classId'];
  }

  ngOnInit(): void {
    this._classes.getClasseById(this.classId).subscribe({
      next: (classe) => (this.classe = classe),
      error: (error) => console.log(error),
      complete: () => {},
    });
    this.classe &&
      this._courses.getCourseById(this.classe.courseId).subscribe({
        next: (course) => (this.course = course),
        error: (error) => console.log(error),
        complete: () => {},
      });
    this._students.getStudents().subscribe({
      next: (students) => {
        this.students = students.filter(
          (student) =>
            student.course.classNumber === this.classe?.classNumber &&
            student.course.courseId === this.course?.id
        );
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  updateClasse(editingClasse: Classe): void {
    this._classes.updateClasse(editingClasse).subscribe({
      next: (response) =>
        (this.classe = {
          ...this.classe,
          ...response,
        }),
    });
  }

  deleteClasse(id: number): void {
    this._classes
      .deleteClasse(id)
      .subscribe(() => this._router.navigate(['classes']));
  }
}
