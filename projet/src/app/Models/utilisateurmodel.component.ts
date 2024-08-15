// src/app/models/utilisateur.model.ts
import { Time } from "@angular/common";
export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motDePasse: string;
  role: Role;  // Le rôle est lié ici
}


export interface Role {
  id: number;
  role: string; // Nom du rôle, par exemple "Admin", "Client", etc.
}


export interface Reservation {
  id: number;
  date_res:Date;
  category: Categorie_Billet;
  evenement:Evenement;
  methodePaiement:Methode_paiement;
  statut:statut_reservation ;
  utilisateur:Utilisateur;
}

export interface statut_reservation {
  id: number;
  statut: string
}

export interface Evenement {
  id: number;
  nom: string;
  date: Date;
  heure: Time;
  datedebut: Date;
  datefin: Date;
  description: string;
  lieu: String;
  // nombrePlace: number;
  typeevent: TypeEvent;
  // utilisateur: Utilisateur;
  category: category;
}

export class TypeEvent{
  id:number;
  type:string;
  constructor(id:number, type:string){
      this.id = id;
      this.type = type;
  }
}
export class category{
  id:number;
  category:string;
  
  constructor(id:number, category:string){
      this.id = id;
      this.category = category;
  }
}

export interface Methode_paiement {
  id: number;
  methodepaie: string
}
    


export interface Categorie_Billet{
  id: number;
  category: string
}

export interface priority_task{
  id: number;
  priority:string
}

export interface Task{

  id:number;
  title:string;
  priority:priority_task;
  evenement: Evenement;
  utilisateur:Utilisateur
}

export interface Lieu{

  id?:number;
  nom:string;
  adresse:string;
  salle:string;
  capacite:number
}
export interface Prestateur{
  id?:number;
  nom_presta:string;
  email:string;
  tel:number;
  profile:string;
  utilisateur:Utilisateur;
  rolePrestateur:RolePrestateur
}
export interface RolePrestateur{
  id?:number;
  role:string;
}
export interface Equipement{
  id?:number;
  nom:string;
  description:string;
  presta:Prestateur;
}
