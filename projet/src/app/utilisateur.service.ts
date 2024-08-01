import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

Injectable({
  providedIn: 'root'
})

const BASIC_URL=['http://localhost:8080/gestEvent/user/'];

export class UtilisateurService {

  constructor(private http :HttpClient) { }
  addAdmin(obj:any): Observable<any>{
      return this.http.post(BASIC_URL+'/CreerAdmin', obj)
  }
}
