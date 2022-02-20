import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';
import { encodePassword } from '../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;
    const hashedPassword = await encodePassword(password);

    const user = {
      email,
      name,
      password: hashedPassword,
    };

    const createdUser = new this.userModel(user);

    const dbUsers = await this.findAll();

    if (dbUsers.some((item) => item.email === email)) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Email já cadastrado no sistema.',
        },
        HttpStatus.CONFLICT,
      );
    }

    return await createdUser.save();
  }
}
