import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
