import { TypeEvent } from "./TypeEvent";
import { Utilisateur } from "./Utilisateur";
import { category } from "./Category";

export interface Evenement {
  id: number;
  nom: string;
  date: Date;
  datedebut: Date;
  datefin: Date;
  description: string;
  lieu: String;
  // nombrePlace: number;
  typeevent: TypeEvent;
  // utilisateur: Utilisateur;
  category: category;
  derouler: Derouler[];
}
export interface Derouler {
  id?: number;
  lieu: Lieu;
  evenement: Evenement;
}
export interface Lieu{

  id?:number;
  nom:string;
  adresse:string;
  salle:string;
  capacite:number
}
    