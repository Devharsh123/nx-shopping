import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nx-shopping'), AuthModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
    })
  }],
})
export class AppModule {}
