/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecurityDatabaseService } from './security-database.service';

describe('SecurityDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityDatabaseService]
    });
  });

  it('should ...', inject([SecurityDatabaseService], (service: SecurityDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
