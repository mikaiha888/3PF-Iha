import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course, Student } from '../../../../core/models';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
})
export class StudentDialogComponent implements OnInit {
  studentForm: FormGroup;
  editingStudent?: Student;
  optionSelected: string = '';
  courseOptions: Course[] = [];
  valueSelected?: number;
  validatedValues: number[] = [];

  constructor(
    private _courses: CoursesService,
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
      course: ['', [Validators.required]],
      classNumber: [101],
      isApproved: [undefined],
    });

    this.editingStudent &&
      this.studentForm.patchValue({
        ...this.editingStudent,
      });
  }

  ngOnInit(): void {
    this._courses.getCourses().subscribe({
      next: (courses) => this.courseOptions = courses,
      complete: () => {} 
    })
  }

  onSave() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.studentForm.value);
    }
  }

  changeValue() {
    if (this.optionSelected === 'Full Stack Development') {
      this.validatedValues = [101, 201];
    } else {
      this.validatedValues = [101];
    }
  }
}
