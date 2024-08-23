import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';
import { Billet, Categorie_Billet, StatutBillet } from '../Models/utilisateurmodel.component';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UtilisateurServiceService } from '../Service/utilisateur.service';
import { EventServiceService } from '../Service/event-service.service';
import { Evenement } from '../Models/Evenement';

@Component({
  selector: 'app-billet',
  standalone: true,
  imports: 
  [
    NgIf,
    NgForOf,
    RouterOutlet,
    RouterLink,
    SidebarComponent,
    ReactiveFormsModule
  ],
  templateUrl: './billet.component.html',
  styleUrl: './billet.component.css'
})
export class BilletComponent {
  BilletForm: FormGroup;
  billet: Billet []=[];
  catBillet:Categorie_Billet[]=[];
  event:Evenement[]=[];
  statut:StatutBillet[]=[];
  isEditing = false;
  currentBid: number | null = null;
  currentUser:any;
  constructor(
    public http : HttpClient, 
    private userService:UtilisateurServiceService,
    private eventService:EventServiceService,
    private authservice:AuthService,
    private champ: FormBuilder
  ) 
  {
    this.BilletForm = this.champ.group({
      quantiteDisponible: ['', Validators.required],
      prix: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      nbreBilletParPersonne: ['', Validators.required],
      categoryBillet: ['', Validators.required],
      evenement: ['', Validators.required],
      status: ['', Validators.required],

    })

  }

  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe({
      next: (data) => {
        this.currentUser = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
      }
    });
    this.getAllBillets();
    this.getCatBillet();
    this.getAllEvent();
    this.getStatutBillet(); // Ajoutez cet appel
  }
  
getAllBillets(){
  this.userService.getBillets().subscribe(
    (data: Billet[])=>{
      console.log('vous êtes dans Billet:', data);
      this.billet = data;
    },
    error =>{
      console.error('erreur Billet:', error)
    }
  )
}

getCatBillet(){
  this.userService.getCatBillets().subscribe(
    (data: Categorie_Billet[])=>{
      console.log('vous êtes dans Equipement:', data);
      this.catBillet = data;
    },
    error =>{
      console.error('erreur RolePrestateur:', error)
    }
  )
}
getAllEvent(){
  this.eventService.getEvents().subscribe(
    (data: Evenement[])=>{
      console.log('vous êtes dans Equipement:', data);
      this.event = data;
    },
    error =>{
      console.error('erreur RolePrestateur:', error)
    }
  )
}
getStatutBillet(){
  this.userService.getStatutBillets().subscribe(
    (data: StatutBillet[])=>{
      console.log('vous êtes dans Equipement:', data);
      this.statut = data;
    },
    error =>{
      console.error('erreur RolePrestateur:', error)
    }
  )
}



onSubmit(): void {
   
  if (this.isEditing && this.currentBid !== null) {
      this.updateBillet();
    } else {
  const newBillet: Billet = this.BilletForm.value;
  newBillet.categoryBillet = { id: this.BilletForm.value.categoryBillet } as Categorie_Billet; 
  newBillet.evenement = { id: this.BilletForm.value.evenement } as Evenement; 
  newBillet.status = { id: this.BilletForm.value.status } as StatutBillet; 
  console.log(newBillet.evenement);

  this.addBillet(newBillet);
 } 
  
}

addBillet(newBillet: Billet): void {
  this.userService.CreerBillet(newBillet).subscribe(
    data => {
      this.billet.push(data);
      this.BilletForm.reset();
    },
    error => {
      console.error('Erreur lors de la création du billet:', error);
      // Afficher des messages d'erreur pour l'utilisateur
    }
  );
}


editBillet(bi: Billet): void {
  this.isEditing = true;
  this.currentBid = bi.id !== undefined ? bi.id : null;
  this.BilletForm.patchValue({
    ...bi
  });
}
//methode pour la mise a jour
updateBillet(): void {
  if (this.currentBid !== null) {
    console.log('id courant',this.currentBid);
    const BilletUpdate: Billet = this.BilletForm.value;
    BilletUpdate.evenement = { id: this.BilletForm.value.evenement } as Evenement; 
    BilletUpdate.status = { id: this.BilletForm.value.status } as StatutBillet; 
    BilletUpdate.categoryBillet = { id: this.BilletForm.value.categoryBillet } as Categorie_Billet; 
    console.log(BilletUpdate);
    this.userService.modifierBillet(this.currentBid, BilletUpdate).subscribe(
      data => {
        const index = this.billet.findIndex(e => e.id === this.currentBid);
        if (index !== -1) {
          this.billet[index] = data;
          //this.filteredLieu[index] = data; // Update the filtered list as well
        }
        this.BilletForm.reset();
        this.isEditing = false;
        this.currentBid = null;
      },
      error => console.error(error)
    );
  }
}

deleteBillet(id: number): void {

  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Vous ne pourrez pas annuler cette action!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.supprimerBillet(id).subscribe(
        () => {
          this.billet = this.billet.filter(u => u.id !== id);
          Swal.fire(
            'Supprimé!',
            'Le Billet a été supprimé.',
            'success'
          );
        },
        error => {
          console.error(error);
          Swal.fire(
            'Supprimer avec succes!',
            'Le billet a été supprimé.',
            'success'
          );
        }
      );
    }
  });
}


  //Logique derriere les POP UP
  visible = false;
   visibleSup = false;
   visibleEq = false;

  afficher(){
    this.visible=true;
  }
  cacher() {
    this.visible=false;
  }
  afficherSup(){
    this.visibleSup=true;
  }
  cacherSup() {
    this.visibleSup=false;
  }
  afficherEq(){
    this.visibleEq=true;
  }
  cacherEq() {
    this.visibleEq=false;
  }



}
