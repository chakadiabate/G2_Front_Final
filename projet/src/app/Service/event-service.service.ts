import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { TypeEvent } from '../Models/TypeEvent';
import { category } from '../Models/Category';
import { Evenement, Lieu } from '../Models/Evenement';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  // private typesSubject = new BehaviorSubject<TypeEvent[]>([]);
  // types$ = this.typesSubject.asObservable();

  private urlType = 'http://localhost:8080/EvenType';
  private urlLieu = 'http://localhost:8080/gestEvent/lieu/ListeLieu';
  private urlCat = 'http://localhost:8080/gestEvent/categories';
  private url = 'http://localhost:8080/gestEvent/event';

  constructor(private Http: HttpClient) {}

  // fetchTypes(): void {
  //   this.Http.get<TypeEvent[]>(`${this.urlType}/all`).subscribe((types) => {
  //     this.typesSubject.next(types);
  //   });
  // }

  getLieu(): Observable<Lieu[]> {
    return this.Http.get<Lieu[]>(this.urlLieu);
  }

  getType(): Observable<TypeEvent[]> {
    return this.Http.get<TypeEvent[]>(`${this.urlType}/all`);
  }

  CreateTypeEvent(type: TypeEvent): Observable<any> {
    return this.Http.post<any>(`${this.urlType}/createtype`, type);
  }

  CreateCat(type: category): Observable<any> {
    return this.Http.post<any>(`${this.urlCat}/AjouterEventCats`, type);
  }

  getCat(): Observable<category[]> {
    return this.Http.get<category[]>(`${this.urlCat}/listeEventCat`);
  }

  getEvents(): Observable<Evenement[]> {
    return this.Http.get<Evenement[]>(`${this.url}/afficher`);
  }

  // Méthode pour récupérer les événements d'un utilisateur spécifique
  getEventsByUserId(id: number): Observable<Evenement[]> {
    return this.Http.get<Evenement[]>(`${this.url}/EventParOrg/${id}`);
  }
  CreateEvent(evenement: Evenement): Observable<any> {
    return this.Http.post<any>(`${this.url}/addEvent`, evenement);
  }

  UpdateEvent(id:number, evenement: Evenement): Observable<Evenement> {
    return this.Http.put<Evenement>(`${this.url}/update/${id}`, evenement);
  }

  DeleteEvent(id: number) {
    return this.Http.delete(`${this.url}/delete/${id}`);
  }
}
