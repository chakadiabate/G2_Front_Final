import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { Evenement,priority_task,Task,Utilisateur } from '../Models/utilisateurmodel.component';
import { FormBuilder,  FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { TasklistService } from '../Service/tasklist.service';
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
    ReactiveFormsModule

  ],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent implements OnInit{

  taskForm: FormGroup;
  tasks : Task[] = [];
  Even: Evenement[] = [];
  Priorite: priority_task  [] = [];
  Uti: Utilisateur[] = [];
  isEditing = false;
  currentUser:any;
  constructor(
    private tasklistservice: TasklistService,
    private authservice: AuthService,
    private champ: FormBuilder
  ) {
    
    this.taskForm = this.champ.group({

      title: ['', Validators.required],
      even_id: ['', Validators.required],
      priority_id: ['', Validators.required],
      user_id: ['', Validators.required]
      
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

  getAllUtil(){
    this.tasklistservice.getAllUtil().subscribe(
      (data: Utilisateur[])=>{
        console.log('vous êtes dans UTILISATEUR:', data);
        this.Uti = data;
      },
      error =>{
        console.error('erreur UTITLISATEUR:', error)
      }
    )
  }

  getAllTask()
     {
      this.tasklistservice.getAllTask().subscribe(
        (data: Task[]) => {
          this.tasks = data;
          console.log("bonjour mon task",data);
         
        },
        error => console.error(error)
      );
    }
  

    onSubmit(): void {
   
      const newTask: Task = this.taskForm.value;
      newTask.even_id = { id: this.taskForm.value.Even } as Evenement; 
      newTask.priority_id = { id: this.taskForm.value.Priorite } as priority_task; 
      newTask.user_id = { id: this.taskForm.value.Uti } as Utilisateur;

      const even_id = this.Even.find(e => e.id === newTask.even_id.id)?.nom
       console.log('voici evenement recuperer:', this.Even);
      // console.log('New user:', newUser);
  
   
      this.addTache(newTask);
    
    }

   
  
  addTache(newTask: Task): void{

    this.tasklistservice.createTask(newTask).subscribe(
      data=>{
        this.tasks.push(data);
      }
    )


  }

  visibleEq=false;
  visibleSup=false;
  visible= false;

  deleteTache(arg0: number) {
    throw new Error('Method not implemented.');
    }
    ModifieTache(_t32: Task) {
    throw new Error('Method not implemented.');
    }

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
