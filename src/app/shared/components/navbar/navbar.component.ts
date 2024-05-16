import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../core/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authUser$: Observable<User | null>;
  navButtons = [
    {
      name: 'Dashboard',
      iconName: 'dashboard',
      alert: false,
      link: '/dashboard',
      isAdminButton: false
    },
    {
      name: 'Cursos',
      iconName: 'school',
      alert: false,
      link: '/courses',
      isAdminButton: false
    },
    {
      name: 'Clases',
      iconName: 'airplay',
      alert: false,
      link: '/classes',
      isAdminButton: false
    },
    {
      name: 'Alumnos',
      iconName: 'group',
      alert: true,
      link: '/students',
      isAdminButton: false
    }
  ];


  constructor(private _auth: AuthService) {
    this.authUser$ = this._auth.authUser;
  }

  logout(): void {
    confirm('¿Deseas cerrar sesión?') 
    && this._auth.logout();
  }
  
  isMobile() {
    return window.innerWidth <= 480;
  }
}
