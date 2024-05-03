import { Component, Input } from '@angular/core';
import { Course } from '../../../core/models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrl: './list-cards.component.scss',
})
export class ListCardsComponent {
  @Input() list: any[] = [];

  getRoute(element: any): string {
    return element.name.split(' ').join('-').toLocaleLowerCase();
  }
}
