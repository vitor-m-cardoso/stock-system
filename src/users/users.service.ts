import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';
import { encodePassword } from '../utils/bcrypt';
import { isValidId } from 'src/products/validations/isValidId.validation';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // realiza a conexao com o banco de dados para encontrar um usuario utilizando o email
  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, name, roles } = createUserDto;
    const hashedPassword = await encodePassword(password);

    const user = {
      email,
      name,
      password: hashedPassword,
      roles,
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

  async removeUser(id: string) {
    await isValidId(id);
    const deletedProduct = await this.userModel.deleteOne({ _id: id }).exec();
    const { deletedCount } = deletedProduct;

    if (deletedCount === 1) {
      return {
        success: 'Usuário deletado com sucesso.',
      };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Usuário não existe no sistema.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
