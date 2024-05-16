import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassesService } from '../../../../core/services/classes.service';
import { MatDialogRef } from '@angular/material/dialog';
import {
  Classe,
  Course,
  DayOfWeek,
} from '../../../../core/models';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-classe-dialog',
  templateUrl: './classe-dialog.component.html',
  styleUrl: './classe-dialog.component.scss',
})
export class ClasseDialogComponent {
  courses: Course[] = [];
  availableClassNumbers: number[] = [];
  daysOfWeek: DayOfWeek[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
  ];

  classeForm = this._formBuilder.group({
    courseName: [''],
    classNumber: [101, Validators.required],
    days: [[''], Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    studentsId: [[]],
    admin: [{}],
  });

  isLinear = false;
  displayCourseForm = false;

  constructor(
    private _classes: ClassesService,
    private _courses: CoursesService,
    private _formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClasseDialogComponent>
  ) {
    this._courses.getCourses().subscribe({
      next: (courses) => (this.courses = courses),
    });
  }

  getAvailableClasses(courseName: string): void {
    this._classes.getAvailableClasses(courseName).subscribe({
      next: (classes) => (this.availableClassNumbers = classes),
    });
  }

  onSave() {
    if (this.classeForm.invalid) {
      this.classeForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.classeForm.value);
    }
  }
}
