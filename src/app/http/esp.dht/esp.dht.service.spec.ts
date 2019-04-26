import { TestBed } from '@angular/core/testing';

import { EspDHTService } from './esp.dht.service';

describe('EspDHTService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EspDHTService = TestBed.get(EspDHTService);
    expect(service).toBeTruthy();
  });
});
