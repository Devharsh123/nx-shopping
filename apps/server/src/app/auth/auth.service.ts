import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
constructor(private jwtTokenService: JwtService, private userService: UserService){}

  async loginWithCredentials(loginDto: LoginDto): Promise<any>{
    const { email } = loginDto;
    const user = await this.userService.findUser(email);
         if (!user) {
            throw new HttpException('user not exists', HttpStatus.BAD_REQUEST);
          }
          
          const payload = {
                id: user._id,
                email: user.email
          }
         return {
           access_token: this.jwtTokenService.sign(payload)
          };
        }
      }
      