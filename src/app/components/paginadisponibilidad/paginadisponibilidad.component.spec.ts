import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadisponibilidadComponent } from './paginadisponibilidad.component';

describe('PaginadisponibilidadComponent', () => {
  let component: PaginadisponibilidadComponent;
  let fixture: ComponentFixture<PaginadisponibilidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginadisponibilidadComponent]
    });
    fixture = TestBed.createComponent(PaginadisponibilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
