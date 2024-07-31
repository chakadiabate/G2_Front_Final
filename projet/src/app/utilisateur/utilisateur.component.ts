import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UtilisateurServiceService } from '../Service/utilisateur.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, Utilisateur } from '../Models/utilisateurmodel.component';
import { RoleService } from '../Service/role.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    RouterOutlet,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SidebarComponent,
    NgxPaginationModule
],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit{
  
  utilisateurForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  filteredUtilisateurs: Utilisateur[] = [];
  roles: Role[] = [];
  isEditing = false;
  currentUserId: number | null = null;
  searchText = '';

  // Pagination properties
  p: number = 1; // Current page
  itemsPerPage: number = 6; // Number of items per page
  currentUser: any;
  constructor(
    private utilisateurService: UtilisateurServiceService,
    private roleservice: RoleService,
    private authservice: AuthService,
    private fb: FormBuilder
  ) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      motDePasse: ['', Validators.required],
      roleId: ['', Validators.required]
    });
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
    this.getAllUsers();
    this.getAllRoles();
  }


  getAllUsers(): void {
    this.utilisateurService.getAllUsers().subscribe(
      (data: Utilisateur[]) => {
        this.utilisateurs = data;
        console.log(data);
        this.filteredUtilisateurs = data; // Initialiser les utilisateurs filtrés
      },
      error => console.error(error)
    );
  }

  getAllRoles(): void {
    this.roleservice.getAllRoles().subscribe(
      (data: Role[]) => {
        console.log('Roles received from server:', data); // Log the data received
        this.roles = data;
      },
      error => {
        console.error('Error fetching roles:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.isEditing && this.currentUserId !== null) {
      this.updateUser();
    } else {
      const newUser: Utilisateur = this.utilisateurForm.value;
      newUser.role = { id: this.utilisateurForm.value.roleId } as Role; // Map roleId to role object
      
      console.log('Roles:', this.roles);
      console.log('New user:', newUser);
  
      const role = this.roles.find(r => r.id === newUser.role.id)?.role;
      console.log('Role:', role);
      console.log('Role ID:', newUser.role.id);
      this.addAdmin(newUser);
    
    }
  }

  
  
  //=========Logique d'ajout des utilisateurs=============
  
  addAdmin(newUser: Utilisateur): void {
    newUser.role = { id: this.utilisateurForm.value.roleId } as Role; // Map roleId to role object
    this.utilisateurService.createUser(newUser).subscribe(
      data => {
        this.utilisateurs.push(data);
        this.filteredUtilisateurs.push(data); // Ajoutez également à la liste filtrée
        this.utilisateurForm.reset();
      },
      error => console.error(error)
    );
  }

  addPersonnel(newPer: Utilisateur): void {
    // Logique spécifique pour ajouter un personnel
    console.log("Adding personnel");
    this.utilisateurService.createPerso(newPer).subscribe(
      data => {
        this.utilisateurs.push(data);
        this.filteredUtilisateurs.push(data);
        this.utilisateurForm.reset();
      },
      error => console.error(error)
    );
  }

  addOrganisateur(newOrg: Utilisateur): void {
    // Logique spécifique pour ajouter un organisateur
    console.log("Adding organisateur");
    this.utilisateurService.createUser(newOrg).subscribe(
      data => {
        this.utilisateurs.push(data);
        this.filteredUtilisateurs.push(data);
        this.utilisateurForm.reset();
      },
      error => console.error(error)
    );
  }

  //=====Fin de cette logique ====================
  
  editUser(user: Utilisateur): void {
    this.isEditing = true;
    this.currentUserId = user.id !== undefined ? user.id : null;
    this.utilisateurForm.patchValue({
      ...user,
      roleId: user.role?.id
    });
  }

  updateUser(): void {
    if (this.currentUserId !== null) {
      const updatedUser: Utilisateur = this.utilisateurForm.value;
      updatedUser.role = { id: this.utilisateurForm.value.roleId } as Role; // Map roleId to role object
      this.utilisateurService.updateUser(this.currentUserId, updatedUser).subscribe(
        data => {
          const index = this.utilisateurs.findIndex(u => u.id === this.currentUserId);
          if (index !== -1) {
            this.utilisateurs[index] = data;
            this.filteredUtilisateurs[index] = data; // Mettez à jour aussi la liste filtrée
          }
          this.utilisateurForm.reset();
          this.isEditing = false;
          this.currentUserId = null;
        },
        error => console.error(error)
      );
    }
  }

  deleteUser(id: number): void {
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
        this.utilisateurService.deleteUser(id).subscribe(
          () => {
            this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
            this.filteredUtilisateurs = this.filteredUtilisateurs.filter(u => u.id !== id); // Mettez à jour aussi la liste filtrée
            Swal.fire(
              'Supprimé!',
              'L\'utilisateur a été supprimé.',
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



  filterUsers(): void {
    this.filteredUtilisateurs = this.utilisateurs.filter(user =>
      user.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.prenom.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.telephone.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (user.role ? user.role.role.toLowerCase().includes(this.searchText.toLowerCase()) : false)
    );
    this.p = 1; // Reset to first page on filter change
  }



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
