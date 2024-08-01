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
