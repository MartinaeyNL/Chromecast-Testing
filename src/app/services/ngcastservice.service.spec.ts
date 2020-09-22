import { TestBed } from '@angular/core/testing';

import { NgcastService } from './ngcast.service';

describe('NgcastserviceService', () => {
  let service: NgcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
