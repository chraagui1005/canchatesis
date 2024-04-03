import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaloginComponent } from './paginalogin.component';

describe('PaginaloginComponent', () => {
  let component: PaginaloginComponent;
  let fixture: ComponentFixture<PaginaloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaloginComponent]
    });
    fixture = TestBed.createComponent(PaginaloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
