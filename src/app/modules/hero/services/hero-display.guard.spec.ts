import { TestBed } from '@angular/core/testing';

import { HeroDisplayGuard } from './hero-display.guard';

describe('HeroDisplayGuard', () => {
  let guard: HeroDisplayGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HeroDisplayGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
