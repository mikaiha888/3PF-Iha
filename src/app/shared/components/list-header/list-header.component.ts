import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../core/models';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss'
})
export class ListHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string | number = '';
  @Input() span: string = '';
  @Input() display: boolean = true;
  @Output() sort = new EventEmitter;
  @Output() add = new EventEmitter;
  authUser$: Observable<User | null>;
  isSortAZ: boolean = true;
  
  constructor(private _auth: AuthService) {
    this.authUser$ = this._auth.authUser;
  }

  sorting() {
    this.isSortAZ = !this.isSortAZ
    this.sort.emit();
  }

  adding() {
    this.add.emit();
  }
}
