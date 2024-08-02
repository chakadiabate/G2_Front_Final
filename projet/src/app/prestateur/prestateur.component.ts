// Importation des modules nécessaires d'Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PrestateurService } from '../Service/prestateur.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Déclaration du composant Angular
@Component({
  standalone: true, // Indique que ce composant est autonome et peut être utilisé sans module Angular traditionnel
  selector: 'app-prestateur', // Nom du sélecteur HTML pour ce composant
  templateUrl: './prestateur.component.html', // URL du fichier template HTML
  styleUrls: ['./prestateur.component.css'], // URL du fichier CSS de style pour ce composant
  imports: [CommonModule, FormsModule, RouterLink] // Modules nécessaires pour ce composant : CommonModule pour les directives Angular de base, FormsModule pour la gestion des formulaires, et RouterLink pour les liens de navigation
})

// Déclaration de la classe du composant
export class PrestateurComponent implements OnInit {
  // Déclaration des propriétés du composant
  prestateur: any = { nom: '', email: '', profile: '', telephone: '', description:'' }; // Objet pour stocker les informations d'un prestateur
  isEditMode: boolean = false; // Booléen pour déterminer si le composant est en mode édition ou ajout

  // Constructeur injectant les services nécessaires
  constructor(
    private prestateurService: PrestateurService, // Service pour gérer les opérations liées aux prestateurs
    private route: ActivatedRoute, // Service pour accéder aux paramètres de route
    private router: Router // Service pour la navigation dans l'application
  ) { }

  // Méthode appelée après que le composant a été initialisé
  ngOnInit(): void {
    // Récupération de l'identifiant du prestateur à partir des paramètres de route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true; // Passage en mode édition si un identifiant est trouvé
      // Récupération des données du prestateur par son identifiant
      this.prestateurService.getPrestateurById(Number(id)).subscribe(data => {
        this.prestateur = data; // Assignation des données récupérées à la propriété prestateur
      });
    }
  }

  // Méthode pour sauvegarder les données du prestateur
  savePrestateur(): void {
    if (this.isEditMode) {
      // Si en mode édition, mettre à jour le prestateur existant
      this.prestateurService.updateprestateur(this.prestateur.id, this.prestateur).subscribe(() => {
        this.router.navigate(['/prestateurs']); // Redirection vers la liste des prestateurs après la sauvegarde
      });
    } else {
      // Sinon, créer un nouveau prestateur
      this.prestateurService.createPrestateur(this.prestateur).subscribe(() => {
        this.router.navigate(['/prestateurs']); // Redirection vers la liste des prestateurs après la création
      });
    }
  }
}
