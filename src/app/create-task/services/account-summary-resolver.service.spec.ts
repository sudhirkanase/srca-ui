import { TestBed } from '@angular/core/testing';

import { AccountSummaryResolverService } from './account-summary-resolver.service';

describe('AccountSummaryResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountSummaryResolverService = TestBed.get(AccountSummaryResolverService);
    expect(service).toBeTruthy();
  });
});
