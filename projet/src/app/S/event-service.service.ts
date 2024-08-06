import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../M/Evenement';
import { TypeEvent } from '../M/TypeEvent';
import { category } from '../M/Category';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  constructor(private Http: HttpClient) {}

  private url = 'http://localhost:8080/gestEvent/event';

  private urlType = 'http://localhost:8080/EvenType/all';

  private urlCat = 'http://localhost:8080/gestEvent/EventCat/listeEventCat';

  getType(): Observable<TypeEvent[]> {
    return this.Http.get<TypeEvent[]>(this.urlType);
  }
  getCat(): Observable<category[]> {
    return this.Http.get<category[]>(this.urlCat);
  }

  getEvents(): Observable<Evenement[]> {
    return this.Http.get<Evenement[]>(`${this.url}/with-lieux`);
  }
  // getEventById(id: number): Observable<Evenement> {
  //   return this.Http.get<Evenement>(`${this.url}/${id}`);
  // }

  CreateEvent(evenement: Evenement): Observable<any> {
    return this.Http.post<any>(`${this.url}/addEvent`, evenement);
  }

  UpdateEvent(evenement: Evenement): Observable<Evenement> {
    return this.Http.put<Evenement>(`${this.url}/update`, evenement);
  }

  DeleteEvent(id: number) {
    return this.Http.delete(`${this.url}/delete/${id}`);
  }
}
