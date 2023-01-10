import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, Connection, Model } from 'mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './entities/user.entity';
import { Stub } from './test/userStub';
import { HttpException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;
  let userStub = new Stub();

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model('User', UserSchema)
   
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

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  })

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getUser', () => {

    it('should return saved user by Id', async () => {
      await (new userModel(userStub.createuserStub()).save());

      const getUser = await userController.findOne(userStub.getUser()._id);
      expect(getUser.email).toBe(userStub.getUser().email);
    });


    it('should return saved user by email', async () => {
      await (new userModel(userStub.createuserStub()).save());

      const getUser = await userController.findByEmail(userStub.getUser().email);
      expect(getUser.email).toBe(userStub.getUser().email);
    });

    it('should throw exception', async () => {
      await (new userModel(userStub.exceptionalUser()).save());

      await expect(userController.findByEmail(userStub.getUser().email)).rejects.toThrow(HttpException)
    });
  })

  describe('createUser', () => {

    it('should create user', async () => {
      const user = await (new userModel(userStub.exceptionalUser()).save());
      expect(user.email).toBe(userStub.exceptionalUser().email)

    })
  })

});






// <--------------------------------------------------------------->
// import { Test } from "@nestjs/testing"
// import { UserController } from "./user.controller"
// import { UserService } from "./user.service";
// import {Stub} from '../user/test/userStub';

// const stub = new Stub()

// jest.mock('./_mocks_/userTest.service.spec');

// describe('UserController',()=>{

//     let userService: UserService;
//     let userController: UserController;
//     beforeEach(async()=>{
//         const moduleRef = await Test.createTestingModule({
//             imports:[],
//             controllers: [UserController],
//             providers: [UserService]

//         }).compile();

//         userController = moduleRef.get<UserController>(UserController);
//         userService = moduleRef.get<UserService>(UserService);
//         jest.clearAllMocks();
//     })

//     describe('findUser',()=>{
//       describe('when get user is called',()=>{
//         let result: any = [stub.getUser()];

//        jest.spyOn(userService,'findAll').mockImplementation(()=>result)

//        expect( userController.findAll()).toBe(result);
//       })
//     })
// })