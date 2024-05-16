import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassNumber, Classe } from '../models';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  AllClassNumber: ClassNumber[] = [101, 202, 303, 404, 505, 606, 707, 808, 909];

  constructor(private _httpClient: HttpClient) {}

  getClasses(): Observable<Classe[]> {
    return this._httpClient.get<Classe[]>(`${environment.apiBaseUrl}/classes`);
  }

  getClassesByCourseName(courseName: string): Observable<Classe[]> {
    return this.getClasses().pipe(
      map((classes) =>
        classes.filter((classe) => classe.courseName === courseName)
      )
    );
  }

  getAvailableClasses(courseName: string): Observable<number[]> {
    return this.getClassesByCourseName(courseName).pipe(
      map((classes) => {
        const fitleredClasses = classes.map((classe) => classe.classNumber);
        return this.AllClassNumber.filter((c) => !fitleredClasses.includes(c));
      })
    );
  }

  createClasse(classe: Classe): Observable<Classe> {
    return this._httpClient.post<Classe>(
      `${environment.apiBaseUrl}/classes`,
      classe
    );
  }

  updateClasse(classe: Classe): Observable<Classe> {
    return this._httpClient.put<Classe>(
      `${environment.apiBaseUrl}/classes/${classe.id}`,
      classe
    );
  }

  deleteClasse(id: string): Observable<Classe> {
    return this._httpClient.delete<Classe>(
      `${environment.apiBaseUrl}/classes/${id}`
    );
  }
}
