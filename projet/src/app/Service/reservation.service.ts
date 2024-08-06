import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../Models/utilisateurmodel.component';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private baseUrl = 'http://localhost:8080/gestEvent/reservation';

  constructor(private http: HttpClient) { }

  getAllReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/ListReservation`);
  }

  CancelReservation(id: number): Observable<any> {
    const url = `${this.baseUrl}/AnnulerReservation?id=${id}`;
    return this.http.patch(url, {});
  }
  
}
