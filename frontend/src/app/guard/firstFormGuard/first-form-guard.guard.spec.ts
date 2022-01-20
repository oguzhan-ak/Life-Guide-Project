import { TestBed } from '@angular/core/testing';

import { FirstFormGuardGuard } from './first-form-guard.guard';

describe('FirstFormGuardGuard', () => {
  let guard: FirstFormGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FirstFormGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
