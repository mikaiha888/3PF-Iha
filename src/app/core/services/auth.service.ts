import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Admin, User } from '../models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUser = new BehaviorSubject<User | Admin | null>(null);
  MOCK_AUTH_USER: User = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: 'asdsdf',
    cel: 123-456-7890,
    createdAt: new Date(),
    role: "STUDENT",
  }

  constructor(private _http: HttpClient, private _router: Router) {}
  
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

  
}
