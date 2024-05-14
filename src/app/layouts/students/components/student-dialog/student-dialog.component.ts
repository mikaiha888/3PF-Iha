import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classe, Course, Student } from '../../../../core/models';
import { CoursesService } from '../../../../core/services/courses.service';
import { ClassesService } from '../../../../core/services/classes.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
})
export class StudentDialogComponent implements OnInit {
  studentForm: FormGroup;
  editingStudent?: Student;
  optionSelected: string = '';
  courses: Course[] = [];
  classes: Classe[] = [];
  displayHint: boolean = true;

  constructor(
    private _courses: CoursesService,
    private _classes: ClassesService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private originalEditingStudent?: Student
  ) {
    if (originalEditingStudent)
      this.editingStudent = { ...originalEditingStudent };

    this.studentForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáíúéóñÁÍÚÉÓÑ]+$'),
          Validators.maxLength(32),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáíúéóñÁÍÚÉÓÑ]+$'),
          Validators.maxLength(32),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      cel: ['', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
      coursesEnrolled: this.formBuilder.group({
        course: ['', Validators.required],
        classe: [0, Validators.required],
        grade: [[]],
        isApproved: [undefined, Validators.required],
      })
    });

    this.editingStudent &&
      this.studentForm.patchValue({
        ...this.editingStudent,
        coursesEnrolled: {
          course: this.editingStudent.courseEnrolled.course.id,
          classe: this.editingStudent.courseEnrolled.classe.id,
          isApproved: this.editingStudent.courseEnrolled.isApproved,
        },
      });
  }

  ngOnInit(): void {
    !this.studentForm.get('course')?.get('name')?.value &&
      this.studentForm.get('course')?.get('classNumber')?.disable();

    this._courses.getCourses().subscribe({
      next: (courses) => (this.courses = courses),
      complete: () => {},
    });

    this.editingStudent &&
      this._classes
        .getClassesByCourse(this.editingStudent.courseEnrolled.course.id)
        .subscribe({
          next: (classes) => (this.classes = classes),
          complete: () => {},
        });
  }

  getClassesByCourse(id: number) {
    if (this.studentForm.get('course')?.value) {
      this.studentForm.get('course')?.get('classNumber')?.enable();
      this.displayHint = false;
      this._classes.getClassesByCourse(id).subscribe({
        next: (classes) => (this.classes = classes),
        complete: () => {},
      });
    }
  }

  onSave() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.studentForm.value);
    }
  }
}
