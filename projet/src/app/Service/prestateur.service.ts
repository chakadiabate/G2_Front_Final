import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestateurService {

  private baseUrl = 'http://localhost:8080/gestEvent/prestateurs';

  constructor(private http: HttpClient) { }

  getAllPrestateurs(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getPrestateurById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPrestateur(prestateur: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, prestateur);
  }

  updateprestateur(id: number, prestateur: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, prestateur);
  }

  deleteprestateur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}