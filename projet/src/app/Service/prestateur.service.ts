import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestateur, RolePrestateur } from '../Models/utilisateurmodel.component';

@Injectable({
  providedIn: 'root'
})
export class PrestateurService {

  private baseUrl = 'http://localhost:8080/gestEvent/prestateurs';
  private baseUrlrole = 'http://localhost:8080/gestEvent/role';

  constructor(private http: HttpClient) { }

  getAllPrestateurs(): Observable<Prestateur[]> {
    return this.http.get<Prestateur[]>(`${this.baseUrl}/ListePresta`);
  }

  getPrestateurById(id: number): Observable<Prestateur> {
    return this.http.get<Prestateur>(`${this.baseUrl}/${id}`);
  }

  createPrestateur(prestateur: Prestateur): Observable<Prestateur> {
    return this.http.post<Prestateur>(`${this.baseUrl}/CreerPresta`, prestateur);
  }

  updateprestateur(id: number, prestateur: Prestateur): Observable<Prestateur> {
    return this.http.put<Prestateur>(`${this.baseUrl}/ModifPresta/${id}`, prestateur);
  }

  deleteprestateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  getAllRolesPresta(): Observable<RolePrestateur[]> {
    return this.http.get<RolePrestateur[]>(`${this.baseUrlrole}/listeRoPresta`);
  }









}