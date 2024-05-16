import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin, Classe } from '../../../../core/models';
import { ClassesService } from '../../../../core/services/classes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrl: './admin-dialog.component.scss',
})
export class AdminDialogComponent {
  adminForm: FormGroup;
  editingAdmin?: Admin;
  optionSelected: string = '';
  displayHint: string = '';
  courses = [
    'Full Stack Development',
    'Frontend Development',
    'Backend Development',
    'UX Design',
    'Marketing',
  ];
  availableClasses: Classe[] = [];

  constructor(
    private _classe: ClassesService,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) originalEditingAdmin?: Admin
  ) {
    if (originalEditingAdmin) this.editingAdmin = { ...originalEditingAdmin };

    this.adminForm = this.formBuilder.group({
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
      courseName: [null],
      classNumber: [null, Validators.required],
      createdAt: [new Date()],
    });

    this.editingAdmin &&
      this.adminForm.patchValue({
        ...this.editingAdmin,
      });
  }

  ngOnInit(): void {
    !this.adminForm.get('courseName')?.value &&
      this.adminForm.get('classNumber')?.disable();
    this.displayHint = '*Seleccionar el curso para habilitar el campo de clase';
    this.editingAdmin &&
      this.editingAdmin.courseName &&
      this.getAvailableClasses(this.editingAdmin.courseName);
  }

  getAvailableClasses(courseName: string): void {
    this._classe.getClassesByCourseName(courseName).subscribe({
      next: (classes) => {
        this.availableClasses = classes;
        if (classes.length) {
          this.adminForm.get('classNumber')?.enable();
        } else {
          this.displayHint = '*No hay clases disponibles en este curso';
          this.adminForm.get('classNumber')?.disable();
        }
      },
    });
  }

  onSave() {
    this.adminForm.invalid
      ? this.adminForm.markAllAsTouched()
      : this.matDialogRef.close(this.adminForm.value);
  }
}
