import { TestBed } from '@angular/core/testing';

import { BotServiceService } from './bot-service.service';

describe('BotServiceService', () => {
  let service: BotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
