import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, map, of } from 'rxjs';
import { Admin, Student, User } from '../models';
import { Router } from '@angular/router';
import { StudentsService } from './students.service';
import { AdminsService } from './admins.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser = new BehaviorSubject<User | Admin | null>(null);
  user?: Student | Admin; 

  constructor(
    private _students: StudentsService,
    private _admins: AdminsService,
    private _router: Router
  ) {}

  getAllUsers(): Observable<(Student | Admin)[]> {
    return forkJoin({
      students: this._students.getStudents(),
      admins: this._admins.getAdmins(),
    }).pipe(map(({ students, admins }) => [...students, ...admins]));
  }

  login(data: User): void {   
    this.getAllUsers().pipe(
      map((users) => {
        this.user = users.find(
          (user) => user.email === data.email && user.password === data.password
        );
        if (this.user) {
          this.authUser.next(this.user);
          localStorage.setItem(
            'accessToken',
            'asdasdhhsfhksjdhfkjasasasdasasasasas'
          );
          this._router.navigate(['dashboard']);          
        } else alert('Email o password incorrectos');
      })
    ).subscribe()
  }

  logout(): void {
    this.authUser.next(null);
    this._router.navigate(['auth']);
    localStorage.removeItem('accessToken');
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    token && this.user && this.authUser.next(this.user);
    return !!token;
  }
}
