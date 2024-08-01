import { TestBed } from '@angular/core/testing';

import { PrestateurService } from './prestateur.service';

describe('PrestateurService', () => {
  let service: PrestateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
