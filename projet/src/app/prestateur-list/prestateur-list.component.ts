// Importation des modules nécessaires d'Angular et autres
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestateurService } from '../Service/prestateur.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../Service/auth.service';

// Déclaration du composant Angular
@Component({
  selector: 'app-prestateur-list', // Nom du sélecteur HTML pour ce composant
  standalone: true, // Indique que ce composant est autonome et peut être utilisé sans module Angular traditionnel
  imports: [RouterLink, NgFor, SidebarComponent, NgIf], // Modules nécessaires pour ce composant : RouterLink pour la navigation, NgFor et NgIf pour les directives structurelles, et SidebarComponent pour inclure une barre latérale
  templateUrl: './prestateur-list.component.html', // URL du fichier template HTML
  styleUrls: ['./prestateur-list.component.css'] // URL du fichier CSS de style pour ce composant
})

// Déclaration de la classe du composant
export class PrestateurListComponent implements OnInit {
  // Déclaration des propriétés du composant
  prestateurs: any[] = []; // Liste des prestateurs à afficher
  currentUser: any; // Détails de l'utilisateur actuellement connecté
  currentUserId: number | null = null; // Identifiant de l'utilisateur actuellement connecté (peut être null)

  // Constructeur injectant les services nécessaires
  constructor(
    private prestateurService: PrestateurService, // Service pour gérer les opérations liées aux prestateurs
    private authservice: AuthService, // Service pour gérer les opérations liées à l'authentification
    private router: Router // Service pour la navigation dans l'application
  ) { }

  // Méthode appelée après que le composant a été initialisé
  ngOnInit(): void {
    // Récupération de tous les prestateurs via le service
    this.prestateurService.getAllPrestateurs().subscribe(data => {
      this.prestateurs = data; // Assignation des prestateurs récupérés à la propriété prestateurs
    });
    // Récupération des détails de l'utilisateur actuel via le service d'authentification
    this.authservice.getCurrentUser().subscribe({
      next: (data) => {
        this.currentUser = data; // Assignation des détails de l'utilisateur à la propriété currentUser
      },
      error: (err) => {
        // Gestion des erreurs lors de la récupération des détails de l'utilisateur
        console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
      }
    });
  }

  // Méthode pour supprimer un prestateur par son identifiant
  deletePrestateur(id: number): void {
    // Affichage d'une boîte de dialogue de confirmation
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce prestateur ?');
    if (confirmation) {
      // Si l'utilisateur confirme, appeler le service pour supprimer le prestateur
      this.prestateurService.deleteprestateur(id).subscribe(() => {
        // Mise à jour de la liste des prestateurs après suppression
        this.prestateurs = this.prestateurs.filter(prestateur => prestateur.id !== id);
      });
    }
  }

  // Méthode pour naviguer vers la page d'édition d'un prestateur
  editPrestateur(id: number): void {
    this.router.navigate(['/edit-prestateur', id]); // Redirection vers la route d'édition du prestateur avec l'identifiant
  }
}
