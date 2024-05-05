import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../core/models/course.model';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrl: './list-cards.component.scss',
})
export class ListCardsComponent {
  @Input() list: any[] = [];
  @Output() delete = new EventEmitter;
  @Output() edit = new EventEmitter;

  deleting(id: number) {
    this.delete.emit(id);
  }  

  editing(element: Course) {
    this.edit.emit(element);
  }  
}
