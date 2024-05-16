import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Admin } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  constructor(private _httpClient: HttpClient) {}

  getAdmins(): Observable<Admin[]> {
    return this._httpClient
      .get<Admin[]>(`${environment.apiBaseUrl}/admins`)
      .pipe(delay(1000));
  }

  getAdminById(id: string): Observable<Admin | undefined> {
    return this._httpClient
      .get<Admin>(`${environment.apiBaseUrl}/admins/${id}`)
      .pipe(delay(1000));
  }

  createAdmin(admin: Admin): Observable<Admin> {
    return this._httpClient.post<Admin>(
      `${environment.apiBaseUrl}/admins`,
      admin
    );
  }

  updateAdmin(admin: Admin): Observable<Admin> {
    return this._httpClient.put<Admin>(
      `${environment.apiBaseUrl}/admins/${admin.id}`,
      admin
    );
  }

  deleteAdmin(id: string): Observable<Admin> {
    return this._httpClient.delete<Admin>(
      `${environment.apiBaseUrl}/admins/${id}`
    );
  }

  sortAdmins(isSortAZ: boolean, admins: Admin[]): Admin[] {
    return isSortAZ
      ? admins.slice().sort((a, b) => a.firstName.localeCompare(b.firstName))
      : admins.slice().sort((a, b) => b.firstName.localeCompare(a.firstName));
  }
}
