import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieuComponent } from './lieu.component';

describe('LieuComponent', () => {
  let component: LieuComponent;
  let fixture: ComponentFixture<LieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LieuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
