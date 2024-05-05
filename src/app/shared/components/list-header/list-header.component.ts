import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss',
})
export class ListHeaderComponent {

  @Input() title: string = '';
  @Input() subtitle: string | number = '';
  @Input() span: string = '';
  @Output() sort = new EventEmitter;
  @Output() add = new EventEmitter;
  isSortAZ: boolean = true;

  sorting() {
    this.isSortAZ = !this.isSortAZ
    this.sort.emit();
  }

  adding() {
    this.add.emit();
  }
}
