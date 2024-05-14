import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classe, Student } from '../../../../core/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClassesService } from '../../../../core/services/classes.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss',
})
export class StudentDialogComponent {
  studentForm: FormGroup;
  editingStudent?: Student;
  optionSelected: string = '';
  displayHint: string = '';
  courses = [
    'Full Stack Development',
    'Frontend Development',
    'Backend Development',
    'UX Design',
    'Marketing',
  ];
  classes: Classe[] = [];

  constructor(
    private _classe: ClassesService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) originalEditingStudent?: Student
  ) {
    if (originalEditingStudent)
      this.editingStudent = { ...originalEditingStudent };

    this.studentForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáíúéóñÁÍÚÉÓÑ ]+$'),
          Validators.maxLength(32),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáíúéóñÁÍÚÉÓÑ ]+$'),
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
      password: ['asd'],
      cel: ['', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
      courseName: ['', Validators.required],
      classNumber: [0, Validators.required],
      isApproved: [undefined],
      createdAt: [new Date()],
    });

    this.editingStudent &&
      this.studentForm.patchValue({
        ...this.editingStudent,
      });
  }

  ngOnInit(): void {
    !this.studentForm.get('courseName')?.value &&
      this.studentForm.get('classNumber')?.disable();
    this.displayHint = '*Seleccionar el curso para habilitar el campo de clase';
    this.editingStudent &&
      this.getClassesByCourse(this.editingStudent.courseName);
  }

  getClassesByCourse(courseName: string): void {
    this._classe.getClassesByCourse(courseName).subscribe({
      next: (classes) => {
        this.classes = classes;
        if (classes.length) {
          this.studentForm.get('classNumber')?.enable();
        } else {
          this.displayHint = '*No hay clases disponibles en este curso';
          this.studentForm.get('classNumber')?.disable();
        }
      },
    });
  }

  onCancel() {
    this.studentForm.invalid
      ? this.studentForm.markAllAsTouched()
      : this.matDialogRef.close(this.studentForm.value);
  }

  onSave() {
    this.studentForm.invalid
      ? this.studentForm.markAllAsTouched()
      : this.matDialogRef.close(this.studentForm.value);
  }
}
