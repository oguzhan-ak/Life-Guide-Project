import { TestBed } from '@angular/core/testing';

import { Auth1GuardService } from '../guard1/auth1.service';

describe('AuthService', () => {
  let service: Auth1GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth1GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
