import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Login, LoginSchema } from './schemas/login.schema';
import { isValidLogin } from './middlewares/login.middleware';
import { isValidEmail } from 'src/users/middlewares/user.middleware';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Login.name, schema: LoginSchema }]),
    UsersModule,
    AuthModule,
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isValidLogin, isValidEmail)
      .forRoutes({ path: '/login', method: RequestMethod.POST });
  }
}
