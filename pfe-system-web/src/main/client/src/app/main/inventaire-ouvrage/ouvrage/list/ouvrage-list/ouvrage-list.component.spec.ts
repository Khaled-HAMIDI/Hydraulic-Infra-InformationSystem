import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvrageListComponent } from './ouvrage-list.component';

describe('OuvrageListComponent', () => {
  let component: OuvrageListComponent;
  let fixture: ComponentFixture<OuvrageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuvrageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuvrageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
