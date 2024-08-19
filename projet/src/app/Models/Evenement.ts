import { TypeEvent } from "./TypeEvent";
import { Utilisateur } from "./utilisateurmodel.component"; 
import { category } from "./Category";
import { Time } from "@angular/common";

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
  utilisateur: Utilisateur;
  category: category;
}

export class Lieu {
  id: number;
  nom: string;
  adresse: string;
  salle:number;
  capacite: number;

  constructor(id: number, nom: string,adresse: string,salle: number, capacite: number) {
    this.id = id;
    this.nom = nom;
    this.adresse = adresse;
    this.salle = salle;
    this.capacite = capacite;
  }
}
    