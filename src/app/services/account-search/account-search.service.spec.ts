/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountSearchService } from './account-search.service';

describe('Service: AccountSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountSearchService]
    });
  });

  it('should ...', inject([AccountSearchService], (service: AccountSearchService) => {
    expect(service).toBeTruthy();
  }));
});
