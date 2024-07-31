import { TestBed } from '@angular/core/testing';
import { UtilisateurServiceService } from './utilisateur.service';



describe('UtilisateurService', () => {
  let service: UtilisateurServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateurServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
