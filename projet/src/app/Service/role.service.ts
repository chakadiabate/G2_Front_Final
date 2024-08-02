import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../Models/utilisateurmodel.component';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'http://localhost:8081/gestEvent/role/listeRole';

  constructor(private http: HttpClient) { }

  // Obtenir tous les rôles
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}`);
  }

  

  

  // Ajouter un nouveau rôle
  addRole(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/AjouterRoles`, role);
  }

  // Supprimer un rôle
  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supCathegorie/${id}`);
  }

  // Modifier un rôle
  updateRole(id: number, role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/modifCategorie/${id}`, role);
  }
}
