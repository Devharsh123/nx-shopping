import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {  Model } from 'mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

const user = {
  email:'newdemo@gmail.com',
  password: 'newdemo123'
}

describe('UserController', () => {
  let userController: UserController;
  let userModel: Model<User>;

  beforeAll(async()=>{
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
      {
        provide: getModelToken('User'),
        useValue: userModel,
      }
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  })
  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create user', async() => {
    const createUser = await userController.create(user)
    expect(createUser).toBeDefined();
    expect(user.email).toStrictEqual(createUser.email)
  });

  it('should return a  user', async() => {

    const getUser = await userController.findAll()
    expect(getUser).toBeDefined();
    // expect(getUser.email).toStrictEqual(getUserByEmail)
  });


});
