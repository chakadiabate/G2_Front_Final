import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../Models/utilisateurmodel.component';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8081/gestEvent/event/Reservation';

  constructor(private http: HttpClient) { }

  getAllReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/ListReservation`);
  }



  createReservation(reservation: Reservation): Observable<Reservation[]> {
    return this.http.post<Reservation[]>(`${this.baseUrl}/Reserver`, reservation);
  }

  updateReservation(id: number, reservation: Object): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, reservation);
  }

  CancelReservation(reservation:Object,statut:string): Observable<any> {
    return this.http.delete(`${this.baseUrl}`);
  }
}
