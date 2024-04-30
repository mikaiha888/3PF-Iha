import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../../core/models';
import { StudentsService } from '../../../../core/services/students.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-student-list-header',
  templateUrl: './student-list-header.component.html',
  styleUrl: './student-list-header.component.scss',
})
export class StudentListHeaderComponent {

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Output() sort = new EventEmitter;
  @Output() add = new EventEmitter;
  isSortAZ: boolean = true;

  constructor(private _students: StudentsService) {}

  sortStudents() {
    this.isSortAZ = !this.isSortAZ
    this.sort.emit();
  }

  openDialog() {
    this.add.emit();
  }
}
