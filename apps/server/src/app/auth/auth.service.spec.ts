import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

export class Token {
  access_token: string
}

export class UserNotExistError {
  status: number;
  message: string;
}

const data = {
  email: 'gwen@gmail.com',
  password: 'gwen123'
}

describe('AuthService', () => {
  let service: AuthService;

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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
