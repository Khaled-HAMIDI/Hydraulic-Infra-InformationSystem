import { TestBed } from '@angular/core/testing';

import { OuvrageListService } from './ouvrage-list.service';

describe('OuvrageListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OuvrageListService = TestBed.get(OuvrageListService);
    expect(service).toBeTruthy();
  });
});
