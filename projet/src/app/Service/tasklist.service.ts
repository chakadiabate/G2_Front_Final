import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evenement, priority_task, Task, Utilisateur } from '../Models/utilisateurmodel.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {

  private baseUrl = 'http://localhost:8080/gestEvent/tasks'
  private EvenUrl = 'http://localhost:8080/gestEvent/event'
  private PrioUrl = 'http://localhost:8080/gestEvent/PriorityTask'
  private UtilUrl = 'http://localhost:8080/gestEvent/user'

  constructor(private http: HttpClient) { }

  createTask(taches: Task): Observable<Task>{
    return this.http.post<Task>(`${this.baseUrl}/CreerTache`, taches)
  }

  getAllTask(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}/ListerTaches`)
  }

  updateTask(id: number, taches: Task): Observable<Task>{
    return this.http.put<Task>(`${this.baseUrl}/ModifTaches/${id}`, taches)
  }

  deleteTask(id: number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/SupTask/${id}`)
  }


  getAllEven(): Observable<Evenement[]>{
    return this.http.get<Evenement[]>(`${this.EvenUrl}/afficher`)
  }

  getAllPrio(): Observable<priority_task[]>{
    return this.http.get<priority_task[]>(`${this.PrioUrl}/ListPriority`)
  }

  getAllUtil(): Observable<Utilisateur[]>{
    return this.http.get<Utilisateur[]>(`${this.UtilUrl}/Users`)
  }
}
