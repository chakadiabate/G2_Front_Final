  import { NgFor, NgIf } from '@angular/common';
  import { Component, NgModule } from '@angular/core';
  import Swal from 'sweetalert2';
  import {
    Router,
    ActivatedRoute,
    RouterOutlet,
    RouterLink,
    RouterModule,
  } from '@angular/router';
 
  import { EventServiceService } from '../Service/event-service.service';
  // import { CardModule } from 'primeng/card';
  

  // import { Evenement, Lieu } from '../Modeles/Evenement';
  import { Evenement } from '../Models/Evenement'; 
  import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
  } from '@angular/forms';
  import { category } from '../Models/Category'; 
  import { TypeEvent } from '../Models/TypeEvent'; 
  import { Lieu } from '../Models/Evenement';
// import { BehaviorSubject } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthService } from '../Service/auth.service';
import { Utilisateur } from '../Models/utilisateurmodel.component';

  @Component({
    selector: 'app-evenement',
    standalone: true,
    imports: [
      NgIf,
      RouterOutlet,
      NgFor,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
      SidebarComponent,
    ],

    templateUrl: './evenement.component.html',
    styleUrl: './evenement.component.css',
  })
  export class EvenementComponent {
    visible = false;
    sup = false;
    catpop = false;
    typepop = false;

    // private typesSubject = new BehaviorSubject<any[]>([]);
    evenement: Evenement[] = [];
    CatEvent: category[] = [];
    typeEvent: TypeEvent[] = [];
    Lieu: Lieu[] = [];
    currentUserId: number | null = null;
    currentEvenId: number | null = null;
    // types: any[] = [];
    // Utilis: Utilisateur[] = [];
    currentUser:any;
    formGroup!: FormGroup;
    TypeFormGroup!: FormGroup;

    CatFormGroup!: FormGroup;

    isSaveInProgress: boolean = false;
    edit: boolean = false;

    constructor(
      private eventService: EventServiceService,
      private formbuilder: FormBuilder,
      private authservice:AuthService,
      private activatedRoute: ActivatedRoute,
      private router: Router
    ) {
      this.formGroup = this.formbuilder.group({
        // id: [1, [Validators.required]],
        nom: ['', [Validators.required]],
        date: ['', [Validators.required]],
        heure: ['', [Validators.required]],
        datedebut: ['', [Validators.required]],
        datefin: ['', [Validators.required]],
        lieu: ['', [Validators.required]],
        description: ['', [Validators.required]],
        typeevent: [null, [Validators.required]],
        utilisateur: [null, [Validators.required]],
        category: [null, [Validators.required]],
      });

      this.TypeFormGroup = this.formbuilder.group({
        type: ['', [Validators.required]],
      });
      this.CatFormGroup = this.formbuilder.group({
        category: ['', [Validators.required]],
      });
    }

    ngOnInit(): void {
      this.authservice.getCurrentUser().subscribe({
        next: (data) => {
        this.currentUser = data;
        this.currentUserId=data.id
        },
        error: (err) => {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
        }
      });
      this.getLieu();
      this.getEvents();
      this.getTypeEvent();
      this.getCat();
    }

    createTypeEvent() {
      this.eventService.CreateTypeEvent(this.TypeFormGroup.value).subscribe({
        next: () => {
          this.TypeFormGroup.reset();
          // this.eventService.fetchTypes();
          this.typepop = false;
          this.router.navigate(['/evenement']);
          this.getTypeEvent();
        },
      });
    }
    createCategory() {
      this.eventService.CreateCat(this.CatFormGroup.value).subscribe({
        next: () => {
          // this.TypeFormGroup.reset();
          // this.eventService.fetchTypes();

          this.catpop = false;
          this.router.navigate(['/evenement']);
          this.getCat();
        },
      });
      this.getCat();
    }

    getEvents() {
      return this.eventService.getEvents().subscribe((data) => {
        this.evenement = data;
      });
    }
    
    getLieu() {
      return this.eventService.getLieu().subscribe((data) => {
        this.Lieu = data;
      });
    }

    getTypeEvent() {
      return this.eventService.getType().subscribe((data) => {
        this.typeEvent = data;
      });
    }

    getCat() {
      return this.eventService.getCat().subscribe((data) => {
        this.CatEvent = data;
      });
    }

    onSubmit(): void {
      if (this.edit && this.currentEvenId !== null) {
        this.updateEvent();
      } else {

        const Evene: Evenement = this.formGroup.value;
        Evene.category = {
          id: this.formGroup.value.category.id,
          category: this.formGroup.value.category.category,
        } as category; // Map roleId to role object
        Evene.typeevent = {
          id: this.formGroup.value.typeevent.id,
          type: this.formGroup.value.typeevent.type,
        } as TypeEvent; 
        Evene.utilisateur = { id: this.currentUserId } as Utilisateur;
        
        this.createEvent(Evene);
        this.getEvents();

      }
      
      // this.router.navigateByUrl('/tache');
    }

    createEvent(event: Evenement) {
      this.eventService.CreateEvent(event).subscribe({
        next: (data) => {
          this.evenement.push(data);
          this.formGroup.reset();
          this.visible = false;
          this.getEvents();
        },
        error: (err) => {
          console.error("Erreur lors de la création de l'événement:", err);
        },
      });
      this.visible = false;
      this.getEvents();
    }

    updateEvent(): void {
      if (this.currentEvenId !== null) {
        const updatedEvent: Evenement = this.formGroup.value;
        // updatedUser.role = { id: this.utilisateurForm.value.roleId } as Role; // Map roleId to role object
        this.eventService.UpdateEvent(this.currentEvenId, updatedEvent)
          .subscribe(
            (data) => {
              const index = this.evenement.findIndex(
                (u) => u.id === this.currentEvenId
              );
              if (index !== -1) {
                this.evenement[index] = data;
                // this.filteredUtilisateurs[index] = data; // Mettez à jour aussi la liste filtrée
              }
              this.formGroup.reset();
              this.edit = false;
              this.currentEvenId = null;
            },
            (error) => console.error(error)
          );
      }
      this.visible = false;
      // this.getEvents();
    }

    editEvent(evenement: Evenement): void {
      this.edit = true;
      this.currentEvenId = evenement.id !== undefined ? evenement.id : null;
      this.formGroup.patchValue({
        ...evenement,
      });
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
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.isConfirmed) {
          this.eventService.DeleteEvent(id).subscribe(
            () => {
              this.evenement = this.evenement.filter((u) => u.id !== id);
              this.getEvents();
              // Mettez à jour aussi la liste filtrée
              Swal.fire(
                'Supprimé!',
                "L'utilisateur a été supprimé.",
                'success'
              );
              this.getEvents();
            },
            (error) => {
              console.error(error);
              Swal.fire(
                'Supprimer avec succes!',
                "L'utilisateur a été supprimé.",
                'success'
              );
            }
          );
          // this.getEvents();
        }
        // this.getEvents();
      });
      this.getEvents();
    }

    // deleteUser(id: number): void {
    //   this.eventService.DeleteEvent(id).subscribe(
    //     () => {
    //       this.evenement = this.evenement.filter((u) => u.id !== id);

    //     },
    //     (error) => console.error(error)
    //   );
    // }

    // createEvent() {
    //   if (this.formGroup.invalid) {
    //     this.messageservice.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Vérifiez tous les champs',
    //     });
    //     this.router.navigateByUrl('/evenement');
    //     return;
    //   }

    //   const eventData = this.prepareEventData(this.formGroup.value);
    //   this.isSaveInProgress = true;
    //   this.eventService.CreateEvent(eventData).subscribe({
    //     next: () => {
    //       this.isSaveInProgress = false;
    //       this.router.navigateByUrl('/evenement');
    //     },
    //   });
    // }

    // updateEvent() {
    //   if (this.formGroup.invalid) {
    //     this.messageservice.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Remplissez tous les champs',
    //     });
    //     return;
    //   }

    //   const eventData = this.prepareEventData(this.formGroup.value);
    //   this.isSaveInProgress = true;
    //   this.eventService.UpdateEvent(eventData).subscribe({
    //     next: () => {
    //       this.messageservice.add({
    //         severity: 'success',
    //         summary: 'Succès',
    //         detail: 'Événement mis à jour avec succès',
    //       });
    //       this.isSaveInProgress = false;
    //     },
    //     error: () => {
    //       this.isSaveInProgress = false;
    //       this.messageservice.add({
    //         severity: 'error',
    //         summary: 'Erreur',
    //         detail: "Erreur lors de la mise à jour de l'événement",
    //       });
    //     },
    //   });
    // }

    // prepareEventData(formData: any) {
    //   const { typeevent, category, utilisateur, ...rest } = formData;
    //   return {
    //     ...rest,
    //     typeevent: { id: typeevent.id },
    //     // users_id: { users_id: 1 },
    //     category: { id: category.id },
    //   };
    // }

    catpopup() {
      this.typepop = false;
      this.catpop = !this.catpop;
    }

    typepopup() {
      this.catpop = false;
      this.typepop = !this.typepop;
    }

    afficher() {
      this.visible = true;
    }

    cacher() {
      this.visible = false;
    }
    ASup() {
      this.sup = true;
    }

    CSup() {
      this.sup = false;
    }
  }
