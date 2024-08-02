import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role, Utilisateur } from '../Models/utilisateurmodel.component';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurServiceService {
  private baseUrl = 'http://localhost:8081/gestEvent/user';
  
  constructor(private http: HttpClient) {}

  createUser(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.baseUrl}/CreerAdmin`, utilisateur);
  }

  updateUser(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}/UpdateUser/${id}`, utilisateur);
  }

  getAllUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/Users`);
  }

  getUserById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/User?id=${id}`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteUser/${id}`);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/listeRole`);
  }

  getRoles(){
    return this.http.get('http://localhost:8081/gestEvent/role/listeRole');
  }
  searchUsers(name: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/TriParNom`, { params: { name } });
  }

  getCurrentUser(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/currentSession`);
  }

}