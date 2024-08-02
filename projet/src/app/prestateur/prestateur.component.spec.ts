import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestateurComponent } from './prestateur.component';

describe('PrestateurComponent', () => {
  let component: PrestateurComponent;
  let fixture: ComponentFixture<PrestateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
