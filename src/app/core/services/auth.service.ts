import { Injectable } from '@angular/core';
import { DataInput, User } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser = new BehaviorSubject<User | null>(null);
  public authUser$ = this.authUser.asObservable();
  MOCK_AUTH_USER: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'ADMIN',
  }

  constructor(private _router: Router) {}

  login(data: User): void {
    if (data.email !== 'asd@asd.com' || data.password !== 'asd') {
      alert('Email o password incorrectos');
    } else {
      this.authUser.next(this.MOCK_AUTH_USER);
      localStorage.setItem(
        'accessToken',
        'asdasdhhsfhksjdhfkjasasasdasasasasas'
      )
      this._router.navigate(['dashboard']);
    }
  }

  logout(): void {
    this.authUser.next(null);
    this._router.navigate(['auth']);
    localStorage.removeItem('accessToken');
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    token && this.authUser.next(this.MOCK_AUTH_USER)
    return !!token;
  }

  getDataInputs(): DataInput[] {
    return [
      {
        name: 'email',
        type: 'email',
        iconName: 'mail',
        placeholder: 'Email',
        errors: {
          required: 'Email es requerido',
          email: 'Email inválido',
        },
      },
      {
        name: 'password',
        type: 'password',
        iconName: 'lock-keyhole',
        placeholder: 'Password',
        errors: {
          required: 'Password es requerido',
        },
      },
    ];
  }
}
