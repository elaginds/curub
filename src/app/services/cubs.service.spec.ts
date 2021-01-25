import { TestBed } from '@angular/core/testing';

import { CubsService } from './cubs.service';

describe('CubsService', () => {
  let service: CubsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CubsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
