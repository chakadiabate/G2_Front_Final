// src/app/models/utilisateur.model.ts

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

export interface Evenement{
  id: number;
  date: Date,
  datedebut: Date,
  datefin: Date,
  description: string,
  nom: string,
  nombre_place:number,
  categories_id:Categorie_event,
  type_event_id:Type_event,
  users_id:Utilisateur,

}

export interface Methode_paiement {
  id: number;
  methodepaie: string
}
    
export interface Categorie_event{
  id: number;
  category: string
}
   
export interface Type_event{
  id: number;
  type: string
}
export interface Categorie_Billet{
  id: number;
  category: string

}

export interface priority_task{
  id: number;
  priority:string
}
 
export class event implements Evenement{
  id: number;
  date: Date;
  datedebut: Date;
  datefin: Date;
  description: string;
  nom: string;
  nombre_place: number;
  categories_id: Categorie_event;
  type_event_id: Type_event;
  users_id: Utilisateur;

  constructor(
    id: number,
    date: Date,
    datedebut: Date,
    datefin: Date,
    description: string,
    nom: string,
    nombre_place: number,
    categories_id: Categorie_event,
    type_event_id: Type_event,
    users_id: Utilisateur,
  ){
    this.id = id,
    this.date= date,
    this.datedebut = datedebut,
    this.datefin=  datefin,
    this.description= description,
    this.nom = nom,
    this.nombre_place = nombre_place,
    this.categories_id = categories_id,
    this.type_event_id = type_event_id,
    this.users_id = users_id
  }
  
}

export interface Task{

  id:number;
  title:string;
  evenement: Evenement;
  priority_task:priority_task;
  utilisateur:Utilisateur
}


