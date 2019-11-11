import { TestBed } from '@angular/core/testing';

import { BasicAuthInterceptorService } from './basic-auth-interceptor.service';

describe('BasicAuthIntreceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicAuthInterceptorService = TestBed.get(BasicAuthInterceptorService);
    expect(service).toBeTruthy();
  });
});
