import { TestBed } from '@angular/core/testing';

import { Auth2GuardService } from './auth2.service';

describe('AuthService', () => {
  let service: Auth2GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth2GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
