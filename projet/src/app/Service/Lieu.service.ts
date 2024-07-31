import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LieuService {

  private baseUrl =  "http://localhost:8080/gestEvent/lieu";

  constructor(private http: HttpClient) { }

  getLieuById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Afficher/${id}`);
  }

  getAllLieu(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  createLieu(Lieu: object){
    return this.http.post<object>(`${this.baseUrl}/Ajouter`, Lieu);
  }

  updateLieu(id: number, Lieu:Object): Observable<Object> {
    return this.http.put<Object>(`${this.baseUrl}/update/{id}`, Lieu);
  }

  deleteLieu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/{id}`);
  }
}
