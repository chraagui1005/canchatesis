import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginareservasComponent } from './paginareservas.component';

describe('PaginareservasComponent', () => {
  let component: PaginareservasComponent;
  let fixture: ComponentFixture<PaginareservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginareservasComponent]
    });
    fixture = TestBed.createComponent(PaginareservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
