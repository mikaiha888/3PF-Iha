import { Component } from '@angular/core';
import { Classe, CourseName } from '../../core/models';
import { ClassesService } from '../../core/services/classes.service';
import { CoursesService } from '../../core/services/courses.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {
  classes: Classe[] = [];
  courseName?: CourseName;
  isSortAZ: boolean = true;

  constructor(private _classes: ClassesService, private _courses: CoursesService) {}

  ngOnInit(): void {
    this._classes.getClasses().subscribe({
      next: (classes) => {
        this.classes = classes;
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }

  getCourseName(id: number) {
    this._courses.getCourseById(id).subscribe({
      next: (course) => this.courseName = course?.name,
      error: (error) => console.log(error),
      complete: () => {},
    })
    return this.courseName;
  }
  
  updateClasse(editingClasse: Classe): void {
    this._classes.updateClasse(editingClasse).subscribe({
      next: (response) => {
        this.classes = this.classes.map((clase) => (
          clase.id === editingClasse.id 
            ? { ...clase, ...response}
            : clase
        ));
      },
    });
  }

  deleteClasse(id: number): void {
    this._classes.deleteClasse(id).subscribe((classes) => this.classes = classes);
  }
    
  sortClasses() {
    this.isSortAZ = !this.isSortAZ;
    this._classes.sortClasses(this.isSortAZ, this.classes).subscribe({
      next: (sortedClasses) => this.classes = [...sortedClasses],
      complete: () => {}
    });
  }

  addClasse() {
    this._classes.addClasse().subscribe({
      next: (response) => {
        response.id = this.classes[this.classes.length - 1].id + 1;
        response.createdAt = new Date();
        response.classesId = [101];
        this.classes = [...this.classes, response];       
      },
    });
  }
}
