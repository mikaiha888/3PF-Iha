import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ClassNumber,
  Classe,
  Course,
  DayOfWeek,
} from '../../../../core/models';
import { CoursesService } from '../../../../core/services/courses.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ClassesService } from '../../../../core/services/classes.service';

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrl: './class-dialog.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class ClassDialogComponent implements OnInit {
  classForm: FormGroup;
  courses: Course[] = [];
  days: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  classesNumber: ClassNumber[] = [101, 202, 303, 404, 505, 606, 707, 808, 909];
  availableClassNumbers: ClassNumber[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<ClassDialogComponent>,
    private _courses: CoursesService,
    private _classes: ClassesService,
    @Inject(MAT_DIALOG_DATA) private editingClasse?: Classe
  ) {
    this.classForm = this.formBuilder.group({
      courseId: ['', [Validators.required]],
      classNumber: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}$')]],
      day: [[], Validators.required],
      startTime: ['', [Validators.required, Validators.pattern('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')]],
      endTime: ['', [Validators.required, Validators.pattern('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')]],
      startDate: ['', [Validators.required, Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[0-2])/(1\d{3}|[1-9]\d{0,3})$')]],
      endDate: ['', [Validators.required, Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])/(0?[1-9]|1[0-2])/(1\d{3}|[1-9]\d{0,3})$')]],
    });

    this._classes.getClasses().subscribe((classes: Classe[]) => {
      const assignedClassNumbers: ClassNumber[] = classes.map(classe => classe.classNumber);

    });

    this.editingClasse &&
      this.classForm.patchValue({
        ...this.editingClasse,
        courseId: this._classes.getClassesByCourse(this.editingClasse.courseId),
      });
  }

  ngOnInit(): void {
    !this.classForm.get('courseId')?.value &&
      this.classForm.get('classNumber')?.disable();
    this._courses.getCourses().subscribe({
      next: (courses) => this.courses = courses,
    });
  }

  onCourseChange() {
    this.classForm.get('courseId')?.value
    ?  this.classForm.get('classNumber')?.enable()
    :  this.classForm.get('classNumber')?.disable()
  }

  getAvailableClassNumbers(id: number) {
    this._classes.getClassesByCourse(id).subscribe({
      next: (classes: Classe[]) => {
        const classNumbersAssigned: ClassNumber[] = classes.map(classe => classe.classNumber);
        this.availableClassNumbers = this.classesNumber.filter(classNum => !classNumbersAssigned.includes(classNum));
      },
      complete: () => {},
    });
  }

  onSave() {
    if (this.classForm.invalid) {
      this.classForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.classForm.value);
    }
  }
}
