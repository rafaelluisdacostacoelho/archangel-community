/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WindowRef } from './window.service';

describe('WindowRef', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRef]
    });
  });

  it('should ...', inject([WindowRef], (service: WindowRef) => {
    expect(service).toBeTruthy();
  }));
});
