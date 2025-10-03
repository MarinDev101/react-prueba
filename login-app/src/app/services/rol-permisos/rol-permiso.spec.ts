import { TestBed } from '@angular/core/testing';

import { RolPermiso } from './rol-permiso';

describe('RolPermiso', () => {
  let service: RolPermiso;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolPermiso);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
