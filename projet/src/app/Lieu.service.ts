import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Lieu } from '../Models/utilisateurmodel.component';
@Injectable({
  providedIn: 'root',
})
export class LieuService {

  private baseUrl =  "http://localhost:8081/gestEvent/lieu";

  constructor(private http: HttpClient) { }

  getLieuById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Afficher/${id}`);
  }

  getAllLieu(): Observable<Lieu[]> {
    return this.http.get<Lieu[]>(`${this.baseUrl}/ListeLieu`);
  }

  createLieu(Lieu: Lieu){
    return this.http.post<Lieu>(`${this.baseUrl}/Ajouter`, Lieu);
  }

  updateLieu(id: number, Lieu:Lieu): Observable<Lieu> {
    return this.http.put<Lieu>(`${this.baseUrl}/update/${id}`, Lieu);
  }

  deleteLieu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
