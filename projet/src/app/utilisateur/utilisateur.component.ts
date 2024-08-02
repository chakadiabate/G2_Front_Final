import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UtilisateurServiceService } from '../Service/utilisateur.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, Utilisateur } from '../Models/utilisateurmodel.component';
import { RoleService } from '../Service/role.service';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SidebarComponent
],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit{
  
  utilisateurForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  roles: Role[] = [];

  roless : any =[]
  isEditing: boolean = false;
  currentUserId: number | null = null;
  searchQuery: string = '';

  constructor(
    private utilisateurService: UtilisateurServiceService,
    private roleservice: RoleService,
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
    this.getAllUsers();
    this.getAllRoles();
  }

  getAllUsers(): void {
    this.utilisateurService.getAllUsers().subscribe(
      (data: Utilisateur[]) => this.utilisateurs = data,
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


  rolest(){
    this.utilisateurService.getRoles().subscribe((data)=>{
      this.roless= data;
      console.log(data)
    })
  }
  

  onSubmit(): void {
    if (this.isEditing && this.currentUserId !== null) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  addUser(): void {
    const newUser: Utilisateur = this.utilisateurForm.value;
    newUser.role = { id: this.utilisateurForm.value.roleId } as Role; // Map roleId to role object
    this.utilisateurService.createUser(newUser).subscribe({
      next: (data) => {
        this.utilisateurs.push(data);
        this.utilisateurForm.reset();
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('User creation complete');
      }
    });
  }
  
  
  editUser(user: Utilisateur): void {
    this.isEditing = true;
    this.currentUserId = user.id !== undefined ? user.id : null;
    this.utilisateurForm.patchValue({
      ...user,
      role: user.role?.id
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
    this.utilisateurService.deleteUser(id).subscribe(
      () => this.utilisateurs = this.utilisateurs.filter(u => u.id !== id),
      error => console.error(error)
    );
  }

  onSearch(): void {
    this.utilisateurService.searchUsers(this.searchQuery).subscribe(
      data => this.utilisateurs = data,
      error => console.error(error)
    );
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
