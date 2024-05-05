import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course, CourseDifficulty } from '../../../../core/models';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss',
})
export class CourseDialogComponent implements OnInit {
  courseForm: FormGroup;
  difficulties: CourseDifficulty[] = [
    'Beginner',
    'Elementary',
    'Pre-intermediate',
    'Intermediate',
    'Upper-intermediate',
    'Advanced',
    'Proficiency',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private editingCourse?: Course
  ) {
    this.courseForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáíúéóñÁÍÚÉÓÑ ]+$'),
          Validators.maxLength(50),
        ],
      ],
      difficulty: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50)]],
    });

    this.editingCourse &&
      this.courseForm.patchValue({
        ...this.editingCourse,
      });
  }

  ngOnInit(): void {}

  onSave() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.courseForm.value);
    }
  }
}
