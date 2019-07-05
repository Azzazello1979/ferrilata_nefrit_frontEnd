import { TestBed } from '@angular/core/testing';

import { ExpiredTokenInterceptorService } from './expired-token-interceptor.service';

describe('ExpiredTokenInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpiredTokenInterceptorService = TestBed.get(ExpiredTokenInterceptorService);
    expect(service).toBeTruthy();
  });
});
