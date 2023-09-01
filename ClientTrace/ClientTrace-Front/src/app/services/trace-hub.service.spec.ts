import { TestBed } from '@angular/core/testing';

import { TraceHubService } from './trace-hub.service';

describe('TraceHubService', () => {
  let service: TraceHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraceHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
