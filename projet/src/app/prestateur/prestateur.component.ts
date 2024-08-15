import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { Prestateur, RolePrestateur, Utilisateur } from '../Models/utilisateurmodel.component';
import { PrestateurService } from '../Service/prestateur.service';
import { UtilisateurServiceService } from '../Service/utilisateur.service';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-prestateur',
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
  templateUrl: './prestateur.component.html',
  styleUrl: './prestateur.component.css'
})
export class PrestateurComponent implements OnInit{
  PrestateurForm: FormGroup;
  prestateurs : Prestateur[] = [];
  Role: RolePrestateur[] = [];
  isEditing = false;
  Orga:Utilisateur[]=[];
  currentUser:any;
  currentPrestaId: number | null = null;
  currentUserId:any;
  constructor(
    private prestateurservice: PrestateurService,
    private userservice:UtilisateurServiceService,
    private authservice:AuthService,
    private champ: FormBuilder
  ) {
    
    this.PrestateurForm = this.champ.group({

      nom_presta: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      profile: ['', Validators.required],
      utilisateur: [''],
      rolePrestateur: ['', Validators.required]      
    })

  }

  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe({
      next: (data) => {
        this.currentUser = data;
        this.currentUserId = data.id;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
      }
    });
    this.initForm();
      this.getAllPrestateur();
      this.getAllRolePrestateur();
      this.getAllUtil();
  }
  initForm(): void {
    this.PrestateurForm = this.champ.group({

      nom_presta: ['', Validators.required],
      email: ['', Validators.required],
      tel: ['', Validators.required],
      profile: ['', Validators.required],
      utilisateur: [this.currentUserId],
      rolePrestateur: ['', Validators.required]      
    });
  }

  getAllRolePrestateur(){
    this.prestateurservice.getAllRolesPresta().subscribe(
      (data: RolePrestateur[])=>{
        console.log('vous êtes dans rolePresta:', data);
        this.Role = data;
      },
      error =>{
        console.error('erreur RolePrestateur:', error)
      }
    )
  }
  getAllPrestateur(){
    this.prestateurservice.getAllPrestateurs().subscribe(
      (data: Prestateur[])=>{
        console.log('vous êtes dans rolePresta:', data);
        this.prestateurs = data;
      },
      error =>{
        console.error('erreur RolePrestateur:', error)
      }
    )
  }

 
  getAllUtil(){
    this.userservice.getAllUsers().subscribe(
      (data: Utilisateur[])=>{
        console.log('vous êtes dans Organisateur:', data);
        this.Orga = data;
      },
      error =>{
        console.error('erreur Orga:', error)
      }
    )
  }



  onSubmit(): void {
    if (this.isEditing && this.currentPrestaId !== null) {
      this.updatePresta();
    } else {
      const newPresta: Prestateur = this.PrestateurForm.value;
      newPresta.rolePrestateur = { id: this.PrestateurForm.value.rolePrestateur } as RolePrestateur; 
      newPresta.utilisateur = { id: this.PrestateurForm.value.utilisateur } as Utilisateur;
  
      this.addPrestateur(newPresta);
    }
    
  }
  

  addPrestateur(newPresta: Prestateur): void {
    this.prestateurservice.createPrestateur(newPresta).subscribe(
      data => {
        this.prestateurs.push(data);
        this.PrestateurForm.reset();
      },
      error => {
        console.error('Erreur lors de la création du prestataire:', error);
        // Afficher des messages d'erreur pour l'utilisateur
      }
    );
  }
  

  editPresta(presta: Prestateur): void {
    this.isEditing = true;
    this.currentPrestaId = presta.id !== undefined ? presta.id : null;
    this.PrestateurForm.patchValue({
      ...presta
    });
  }
  //methode pour la mise a jour
  updatePresta(): void {
    if (this.currentPrestaId !== null) {
      console.log('id courant',this.currentPrestaId);
      const PrestatUpdate: Prestateur = this.PrestateurForm.value;
      PrestatUpdate.rolePrestateur = { id: this.PrestateurForm.value.rolePrestateur } as RolePrestateur; 
      PrestatUpdate.utilisateur = { id: this.PrestateurForm.value.utilisateur } as Utilisateur;
      console.log(PrestatUpdate);
      this.prestateurservice.updateprestateur(this.currentPrestaId, PrestatUpdate).subscribe(
        data => {
          const index = this.prestateurs.findIndex(e => e.id === this.currentPrestaId);
          if (index !== -1) {
            this.prestateurs[index] = data;
            //this.filteredLieu[index] = data; // Update the filtered list as well
          }
          this.PrestateurForm.reset();
          this.isEditing = false;
          this.currentPrestaId = null;
        },
        error => console.error(error)
      );
    }
  }

  deletePresta(id: number): void {
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
        this.prestateurservice.deleteprestateur(id).subscribe(
          () => {
            this.prestateurs = this.prestateurs.filter(u => u.id !== id);
           
            Swal.fire(
              'Supprimé!',
              'Le prestataire a été supprimé.',
              'success'
            );
          },
          error => {
            console.error(error);
            Swal.fire(
              'Supprimer avec succes!',
              'L\'utilisateur a été supprimé.',
              'success'
            );
          }
        );
      }
    });

  }
  



  visibleEq=false;
  visibleSup=false;
  visible= false;



  cacherSup() {
    this.visibleSup=true;
    }
    cacherEq() {
    this.visibleEq=false;
    }
   
    
    afficherEq() {
      this.visibleEq=true;
    }
    afficherSupprimer() {
    this.visibleSup=true;
    }
 

}



