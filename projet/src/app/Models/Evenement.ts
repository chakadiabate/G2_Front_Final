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
}


    