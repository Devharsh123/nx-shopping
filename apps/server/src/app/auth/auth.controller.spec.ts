import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const user = {
  email:'test@gmail.com',
  password: 'test123'
}

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [ {
        provide: AuthService,
        useValue: {
          registerUserAsync: jest.fn(),
        }
      }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });
    it('Should be defined',async()=>{
      expect(controller).toBeDefined();
    })  

});
