import { TestBed } from '@angular/core/testing';

import { JwtUnAuthorizedInterceptorService } from './error-interceptor.service';

describe('JwtUnAuthorizedInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtUnAuthorizedInterceptorService = TestBed.get(JwtUnAuthorizedInterceptorService);
    expect(service).toBeTruthy();
  });
});
