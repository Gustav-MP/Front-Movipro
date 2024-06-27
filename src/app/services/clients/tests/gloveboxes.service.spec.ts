import { TestBed } from '@angular/core/testing';

import { GloveboxesService } from '../gloveboxes.service';

describe('GloveboxesService', () => {
  let service: GloveboxesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GloveboxesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
