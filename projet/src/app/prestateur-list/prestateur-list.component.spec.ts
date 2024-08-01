import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestateurListComponent } from './prestateur-list.component';

describe('PrestateurListComponent', () => {
  let component: PrestateurListComponent;
  let fixture: ComponentFixture<PrestateurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestateurListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestateurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
