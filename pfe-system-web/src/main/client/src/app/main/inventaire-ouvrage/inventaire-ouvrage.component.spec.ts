import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventaireOuvrageComponent } from './inventaire-ouvrage.component';

describe('InventaireOuvrageComponent', () => {
  let component: InventaireOuvrageComponent;
  let fixture: ComponentFixture<InventaireOuvrageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventaireOuvrageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventaireOuvrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
