import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, RegisterDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User> ){}

  async createUser(createUserDto: RegisterDto) {
    const user =  new this.userModel(createUserDto);
     await user.save();
      return user;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findOne({id});
  }

  async findUser(email: string): Promise<any>{
    const user = await this.userModel.findOne({email: email});
    if(!user){
      throw new HttpException('User not exist', HttpStatus.BAD_REQUEST)
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
