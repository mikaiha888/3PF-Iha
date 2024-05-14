import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from '../models';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private _httpClient: HttpClient) {}

  getClasses(): Observable<Classe[]> {
    return this._httpClient.get<Classe[]>(`${environment.apiBaseUrl}/classes`);
  }

  getClassesByCourse(courseName: string): Observable<Classe[]> {
    return this.getClasses().pipe(
      map((classes) => {
        return classes.filter((classe) => classe.courseName === courseName);
      })
    );
  }

  getClasseByData(classeData: any): Observable<Classe | undefined> {
    return this.getClasses().pipe(
      map((classes) => {
        return classes.find(
          (classe) =>
            classe.courseName === classeData.courseName &&
            classe.classNumber === Number(classeData.classNumber)
        );
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
