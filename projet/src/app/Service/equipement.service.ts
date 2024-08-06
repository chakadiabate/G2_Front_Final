import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipement } from '../Models/utilisateurmodel.component';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  private baseUrl =  "http://localhost:8080/gestEvent/equipements";

  constructor(private http: HttpClient) { }

  getEquipementById(id: number): Observable<Equipement> {
    return this.http.get<Equipement>(`${this.baseUrl}/Afficher/${id}`);
  }

  getAllEquipement(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(`${this.baseUrl}/listEquipements`);
  }

  createEquipement(Equipement: Equipement){
    return this.http.post<Equipement>(`${this.baseUrl}/ajoutEquipement`, Equipement);
  }

  updateEquipement(id: number, Equipement:Equipement): Observable<Equipement> {
    return this.http.put<Equipement>(`${this.baseUrl}/modifEquipement/${id}`, Equipement);
  }

  deleteEquipement(id: number): Observable<Equipement> {
    return this.http.delete<Equipement>(`${this.baseUrl}/supEquipement/${id}`);
  }


}
