import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { UserService } from "../user/user.service";
import {AuthController} from './auth.controller';
import { AuthService } from "./auth.service";

describe('Auth Controller',()=>{
  let authController: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async()=>{
    const moduleRef = await Test.createTestingModule({
      imports:[],
      controllers: [AuthController],
      providers:[
        {
          provide: AuthService,
          useValue: {
            loginWithCredentials: jest.fn()
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn()
          }
        },
        {
          provide: UserService,
          useValue:{
            findUser :jest.fn()
          }
        }
      ]
    }).compile();
    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('login',()=>{
    it('return token on login',async()=>{
      const token = {
        access_token: ''
      }
      const data = {
        email:'test@gmail.com',
        password: 'test123'
      }

      const result: string = 'test'
      const credSpy = jest.spyOn(authService,'loginWithCredentials')
      await authController.login(data)
      expect(credSpy).toBeDefined();

    })
    it('return token exception',async()=>{
      const token = {
        access_token: ''
      }
      const data = {
        email:'test123@gmail.com',
        password: 'test123'
      }

      const result: string = 'test'
      const credSpy = jest.spyOn(authService,'loginWithCredentials')
      console.log(credSpy.getMockImplementation(),'spy')
      const user =  await authController.login(data)

     console.log(user,'user')
      expect(credSpy).toBeDefined();

    })

  })




})