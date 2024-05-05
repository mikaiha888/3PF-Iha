import { Component } from '@angular/core';
import { Class } from '../../core/models';
import { ClassesService } from '../../core/services/classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent {
  classes: Class[] = [];
  isSortAZ: boolean = true;

  constructor(private _classes: ClassesService) {}

  ngOnInit(): void {
    this._classes.getClasses().subscribe({
      next: (classes) => {
        this.classes = classes;
      },
      error: (error) => console.log(error),
      complete: () => {},
    });
  }
  
  updateClass(editingClasses: Class): void {
    this._classes.updateClass(editingClasses).subscribe({
      next: (response) => {
        this.classes = this.classes.map((clase) => (
          clase.id === editingClasses.id 
            ? { ...clase, ...response}
            : clase
        ));
      },
    });
  }

  deleteClass(id: number): void {
    this._classes.deleteClass(id).subscribe((classes) => this.classes = classes);
  }
    
  sortClasses() {
    this.isSortAZ = !this.isSortAZ;
    this._classes.sortClasses(this.isSortAZ, this.classes).subscribe({
      next: (sortedClasses) => this.classes = [...sortedClasses],
      complete: () => {}
    });
  }

  addClass() {
    this._classes.addClass().subscribe({
      next: (response) => {
        response.id = this.classes[this.classes.length - 1].id + 1;
        response.createdAt = new Date();
        response.classesId = [101];
        this.classes = [...this.classes, response];       
      },
    });
  }
}
