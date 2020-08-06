import { TestBed } from '@angular/core/testing';

import { AccountSharedService } from './account-shared.service';

describe('AccountSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountSharedService = TestBed.get(AccountSharedService);
    expect(service).toBeTruthy();
  });
});
