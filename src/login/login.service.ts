import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
import { Login } from './schemas/login.schema';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async loggedUser(loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
  }
}
