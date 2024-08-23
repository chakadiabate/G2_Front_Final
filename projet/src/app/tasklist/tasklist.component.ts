import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Evenement, priority_task, Task, Utilisateur } from '../Models/utilisateurmodel.component';
import { FormBuilder,  FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { TasklistService } from '../Service/tasklist.service';
import { EventServiceService } from '../Service/event-service.service';
import { UtilisateurServiceService } from '../Service/utilisateur.service';
import { AuthService } from '../Service/auth.service';


@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: 
  [
    NgIf,
    NgForOf,
    RouterOutlet,
    RouterLink,
    SidebarComponent,
    ReactiveFormsModule,
    CommonModule
    
  

  ],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent implements OnInit{


  taskForm: FormGroup;
  tasks : Task[] = [];
  Even: Evenement[] = [];
  Priorite: priority_task[] = [];
  Uti: Utilisateur[] = [];
  isEditing : boolean = false;
  currentTaskId: number | null = null;
  currentUser:any;
  currentUserId: number | null = null;
  constructor(
    private tasklistservice: TasklistService,
    private authservice:AuthService,
    private eventservice: EventServiceService,
    private userservice: UtilisateurServiceService,
    private champ: FormBuilder
  ) {
    
    this.taskForm = this.champ.group({

      title: ['', Validators.required],
      priority: ['', Validators.required],
      evenement: ['', Validators.required],
      utilisateur: ['', Validators.required]
      
    })

  }

  ngOnInit(): void {
    this.authservice.getCurrentUser().subscribe({
		  next: (data) => {
			this.currentUser = data;
      this.currentUserId=data.id;
		  },
		  error: (err) => {
			console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
		  }
		});
      this.getAllTask();
      this. getAllEven();
      this.getAllPrio();
      this.getAllUtil();
  }

  getAllEven(){
    this.eventservice.getEvents().subscribe(
      (data: Evenement[])=>{
        console.log('vous êtes dans EVENEMENT:', data);
        this.Even = data;
      },
      error =>{
        console.error('erreur EVENEMENT:', error)
      }
    )
  }

  getAllPrio(){
    this.tasklistservice.getAllPrio().subscribe(
      (data: priority_task[])=>{
        console.log('vous êtes dans PRIORITY:', data);
        this.Priorite = data;
        data.forEach(element => {
          console.log("bonjour mon task",element.priority);
      
        });
      },
      error =>{
        console.error('erreur PRIORITY:', error)
      }
    )
  }

  getAllUtil()
     {
      this.userservice.getAllUsers().subscribe(
        (data: Utilisateur[]) => {
          this.Uti = data;
          data.forEach(element => {
            console.log("bonjour mon task",element.nom);
        
          });
          console.log("bonjour mon Utilisateur",data);
         
        },
        error => console.error(error)
      );
    }
  getAllTask()
     {
      this.tasklistservice.getAllTask().subscribe(
        (data: Task[]) => {
          this.tasks = data;
          data.forEach(element => {
            console.log("bonjour mon task",element.title);
        
          });
         
        },
        error => console.error(error)
      );
    }
  

    onSubmit(): void {
      if(this.isEditing){
           this.updateTask();
      }
      else{
        const newTask: Task = {
          ...this.taskForm.value,
          evenement: { id: this.taskForm.value.evenement } as Evenement,
          priority: { id: this.taskForm.value.priority } as priority_task,
          utilisateur: { id: this.currentUserId} as Utilisateur
        };
    
        const evenement = this.Even.find(e => e.id === newTask.evenement.id)?.nom
         console.log('voici evenement recuperer:', this.Even);
        // console.log('New user:', newUser);
    
     
        this.addTache(newTask);
      }
    
    }

   
  
  addTache(newTask: Task): void{

    this.tasklistservice.createTask(newTask).subscribe(
      data=>{
        this.tasks.push(data);
      }
    )


  }


  editTache(tache: Task): void {
    this.isEditing = true;
    this.currentTaskId = tache.id !== undefined ? tache.id : null;
    this.taskForm.patchValue({
      ...tache,
      utilisateur: tache.utilisateur?.id
    });
  }


  updateTask():void{

    if (this.currentTaskId !== null) {
      const updatedTask: Task = this.taskForm.value;
      updatedTask.evenement= { id: this.taskForm.value.evenement } as Evenement; // Map roleId to role object
      //updatedTask.utilisateur= { id: this.currentUserId } as Utilisateur;
      updatedTask.priority= { id: this.taskForm.value.priority } as priority_task;
      this.tasklistservice.updateTask(this.currentTaskId, updatedTask).subscribe(
        data => {
          const index = this.tasks.findIndex(t => t.id === this.currentTaskId);
          if (index !== -1) {
            this.tasks[index] = data;
          }
          this.taskForm.reset();
          this.isEditing = false;
          this.currentTaskId = null;
        },
        error => console.error(error)
      );
    }
  }
  

  
  visibleEq=false;
  visibleSup=false;
  visible= false;

  deleteTache(id: number) {
    this.tasklistservice.deleteTask(id).subscribe(
      () => this.tasks = this.tasks.filter( t =>t.id !== id),
      error => console.error(error)
    );
    }
   

    afficher(){
      this.visible=true;
    }
    cacher() {
      this.visible=false;
    }
    afficherSupprimer(){
      this.visibleSup=true;
    }
    confirmDeleteTache() {
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
