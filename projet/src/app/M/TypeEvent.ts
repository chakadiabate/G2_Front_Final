import { EventServiceService } from '../S/event-service.service';

export class TypeEvent {
  id: number;
  type: string;
  constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
  }
}
