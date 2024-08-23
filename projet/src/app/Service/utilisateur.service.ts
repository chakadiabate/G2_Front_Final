import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Billet, Categorie_Billet, Role, StatutBillet, Utilisateur } from '../Models/utilisateurmodel.component';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurServiceService {
  private baseUrl = 'http://localhost:8080/gestEvent/user';
  private baseUrlBillet = 'http://localhost:8080/gestEvent/billets';
  private baseUrlCatB = 'http://localhost:8080/gestEvent/categories';
  
  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    const authHeader = localStorage.getItem('authToken');
    if (!authHeader) {
      console.error('Aucun token d\'authentification trouvé');
      throw new Error('Aucun token d\'authentification trouvé');
    }
    return new HttpHeaders({
      'Authorization': `Basic ${authHeader}`,
      'Content-Type': 'application/json'
    });
  }

  getCurrentUser(): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/currentSession`);
  }

  

  updateProfile(utilisateur: Utilisateur): Observable<Utilisateur> {
    const headers = this.createAuthorizationHeader();
    return this.http.put<Utilisateur>(`${this.baseUrl}/updateProfile`, utilisateur, { headers });
  }

  createAdmin(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.baseUrl}/CreerAdmin`, utilisateur);
  }
  createOrga(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.baseUrl}/CreerOrga`, utilisateur);
  }
  createPerso(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${this.baseUrl}/CreerGest`, utilisateur);
  }
  updateUser(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}/UpdateUser/${id}`, utilisateur);
  }

  getAllUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/Users`);
  }

  getUserById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/User?id=${id}`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteUser/${id}`);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/listeRole`);
  }

  getRoles(){
    return this.http.get('http://localhost:8080/gestEvent/role/listeRole');
  }
  searchUsers(name: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/TriParNom`, { params: { name } });
  }
  // SERVICE POUR LE BILLET
  getBillets(): Observable<Billet[]> {
    return this.http.get<Billet[]>(`${this.baseUrlBillet}/afficherBillets`);
  }
  CreerBillet(billet: Billet): Observable<Billet> {
    return this.http.post<Billet>(`${this.baseUrlBillet}/AjoutBillet`, billet);
  }
  modifierBillet(id: number, billet: Billet): Observable<Billet> {
    return this.http.put<Billet>(`${this.baseUrlBillet}/update/${id}`, billet);
  }
  supprimerBillet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrlBillet}/deleteBillet/${id}`);
  }
  // FIN SERVICE POUR LE BILLET
  getCatBillets(): Observable<Categorie_Billet[]> {
    return this.http.get<Categorie_Billet[]>(`${this.baseUrlCatB}/AfficherBillet`);
  }

  CreerCategorie(categorie: Categorie_Billet): Observable<Categorie_Billet> {
    return this.http.post<Categorie_Billet>(`${this.baseUrlCatB}/AjouterCATBillet`, categorie);
  }
  
  getStatutBillets(): Observable<StatutBillet[]> {
    return this.http.get<StatutBillet[]>(`http://localhost:8080/GestEven/Statut/AfficherStatutBillet`);
  }


}