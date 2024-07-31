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
import { EventServiceService } from '../S/event-service.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Evenement } from '../M/Evenement';
import { MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { category } from '../M/Category';
import { TypeEvent } from '../M/TypeEvent';
import { Utilisateur } from '../M/Utilisateur';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-evenement',
  standalone: true,
  imports: [
    // NgIf,
    // RouterOutlet,
    // NgFor,
    // CardModule,
    // RouterModule,
    // ReactiveFormsModule,
    // FormsModule,
    // ButtonModule,
    // SidebarComponent
  ],

  templateUrl: './evenement.component.html',
  styleUrl: './evenement.component.css',
})
export class EvenementComponent {
  visible = false;
  sup = false;
  catpop = false;
  typepop = false;

  evenement: Evenement[] = [];
  CatEvent: category[] = [];
  typeEvent: TypeEvent[] = [];
  currentUserId: number | null = null;
  // Utilis: Utilisateur[] = [];

  formGroup!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;

  constructor(
    private eventService: EventServiceService,
    private formbuilder: FormBuilder,
    private messageservice: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this.formbuilder.group({
      // id: [1, [Validators.required]],
      nom: ['', [Validators.required]],
      date: ['', [Validators.required]],
      datedebut: ['', [Validators.required]],
      lieu: ['', [Validators.required]],
      datefin: ['', [Validators.required]],
      description: ['', [Validators.required]],
      typeevent: [null, [Validators.required]],
      // users_id: [null, [Validators.required]],
      category: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    // let id = this.activatedRoute.snapshot.paramMap.get('id');
    // if (id !== 'addEvent') {
    //   this.edit = true;
    //   // this.getEventById(+id!);
    // }
    this.getEvents();
    this.getTypeEvent();
    this.getCat();
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
    // if (this.isEditing && this.currentUserId !== null) {
    //   this.updateUser();
    // } else {}
    const Evene: Evenement = this.formGroup.value;
    Evene.category = {
      id: this.formGroup.value.category.id,
      category: this.formGroup.value.category.category,
    } as category; // Map roleId to role object
    Evene.typeevent = {
      id: this.formGroup.value.typeevent.id,
      type: this.formGroup.value.typeevent.type,
    } as TypeEvent; // Map roleId to role object

    // console.log('Roles:', this.roles);
    // console.log('New user:', newUser);

    // const typeE = this.typeEvent.find((r) => r.id === Evene.typeevent.id)?.type;
    // const catE = this.CatEvent.find((r) => r.id === Evene.category.id)?.category;

    // const evene: Evenement = {
    //   ...this.formGroup.value,
    //   typeevent: { Evene., type: selectedTypeEvent.type },
    //   category: {
    //     id: selectedCategory.id,
    //     category: selectedCategory.category,
    //   },
    // };

    this.createEvent(Evene);
    // this.router.navigateByUrl('/tache');
  }

  createEvent(event: Evenement) {
    // event.category = { id: this.formGroup.value.category } as category; // Map roleId to role object
    // event.typeevent = { id: this.formGroup.value.typeevent } as TypeEvent; // Map roleId to role object
    this.eventService.CreateEvent(event).subscribe({
      next: (data) => {
        this.evenement.push(data);
        this.formGroup.reset();
        this.router.navigateByUrl('/evenement');
      },
      error: (err) => {
        // Gérer les erreurs ici, par exemple :
        console.error("Erreur lors de la création de l'événement:", err);
      },
    });
  }

  getEvents() {
    return this.eventService.getEvents().subscribe((data) => {
      this.evenement = data;
    });
  }

  editUser(evenement: Evenement): void {
    this.edit = true;
    this.currentUserId = evenement.id !== undefined ? evenement.id : null;
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
            // Mettez à jour aussi la liste filtrée
            Swal.fire('Supprimé!', "L'utilisateur a été supprimé.", 'success');
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
      }
    });
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
