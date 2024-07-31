import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../Models/utilisateurmodel.component';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8080/gestEvent/event/Reservation';

  constructor(private http: HttpClient) { }

  getAllReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/ListReservation`);
  }

  getResevationById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createReservation(reservation: Reservation): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ListReservation`, reservation);
  }

  updateReservation(id: number, reservation: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, reservation);
  }

  CancelReservation(reservation:Object,statut:string): Observable<any> {
    return this.http.delete(`${this.baseUrl}`);
  }
}
