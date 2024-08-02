import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  private baseUrl =  "http://localhost:8081/gestEvent/Equipement";

  constructor(private http: HttpClient) { }

  getEquipementById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Afficher/${id}`);
  }

  getAllEquipement(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  createEquipement(Equipement: object){
    return this.http.post<object>(`${this.baseUrl}/Ajouter`, Equipement);
  }

  updateEquipement(id: number, Equipement:Object): Observable<Object> {
    return this.http.put<Object>(`${this.baseUrl}/update/{id}`, Equipement);
  }

  deleteEquipement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/{id}`);
  }


}
