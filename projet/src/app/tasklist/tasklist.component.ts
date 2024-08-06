import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { Evenement, priority_task, Task, Utilisateur } from '../Models/utilisateurmodel.component';
import { FormBuilder,  FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { TasklistService } from '../Service/tasklist.service';


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
    ReactiveFormsModule
    
  

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

  constructor(
    private tasklistservice: TasklistService,
    private champ: FormBuilder
  ) {
    
    this.taskForm = this.champ.group({

      title: ['', Validators.required],
      evenement: ['', Validators.required],
      priority_task: ['', Validators.required],
      utilisateur: ['', Validators.required]
      
    })

  }

  ngOnInit(): void {
      this.getAllTask();
      this. getAllEven();
      this.getAllPrio();
      this.getAllUtil();
  }

  getAllEven(){
    this.tasklistservice.getAllEven().subscribe(
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
      },
      error =>{
        console.error('erreur PRIORITY:', error)
      }
    )
  }

  getAllUtil()
     {
      this.tasklistservice.getAllUtil().subscribe(
        (data: Utilisateur[]) => {
          this.Uti = data;
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
            console.log("bonjour mon task",element.evenement.nom);
        
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
          priority_task: { id: this.taskForm.value.priority_task } as priority_task,
          utilisateur: { id: this.taskForm.value.utilisateur } as Utilisateur
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
      updatedTask.utilisateur= { id: this.taskForm.value.utilisateur } as Utilisateur;
      updatedTask.priority_task= { id: this.taskForm.value.priority_task } as priority_task;
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
