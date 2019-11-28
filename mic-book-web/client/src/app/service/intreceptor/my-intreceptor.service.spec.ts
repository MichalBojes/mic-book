import { TestBed } from '@angular/core/testing';

import { MyIntreceptorService } from './my-intreceptor.service';

describe('MyIntreceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyIntreceptorService = TestBed.get(MyIntreceptorService);
    expect(service).toBeTruthy();
  });
});
