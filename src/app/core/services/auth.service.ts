import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataInput, User } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private authUser = new BehaviorSubject<User | null>(null);
  public authUser$ = this.authUser.asObservable();

  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'qwerty123',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: 'alice123',
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob@example.com',
      password: 'bob456',
    },
    {
      id: 5,
      name: 'Emma Davis',
      email: 'emma@example.com',
      password: 'emma789',
    },
  ];

  constructor(private _router: Router) {}

  login(): void {
    this.authUser.next({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
    this._router.navigate(['dashboard'])
  }

  logout(): void {
    this.authUser.next(null);
    this._router.navigate(['auth'])
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
