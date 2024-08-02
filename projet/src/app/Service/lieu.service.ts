import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class anyService {
  private apiUrl = 'http://your-api-url/any';  

  constructor(private http: HttpClient) { }

  getAllLieu(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }


  getany(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createany(any: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, any);
  }

  updateany(id: number,lieu:object): Observable<object> {
    return this.http.put(`${this.apiUrl}/${id}`, lieu);
  }

  deleteany(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
