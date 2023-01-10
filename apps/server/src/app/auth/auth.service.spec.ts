import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            registerUserAsync: jest.fn(),
          }
        }],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

});
