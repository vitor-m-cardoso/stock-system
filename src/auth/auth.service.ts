import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const userDB = await this.usersService.findOne(email);
    // se o usuário não existir retorna uma exceção
    if (!userDB) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Usuário ou senha incorretos.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // caso o usuario exista no banco de dados,
    // compara a senha inserida com o hash da senha no BD
    const matched = await comparePassword(password, userDB.password);

    // se a senha estiver incorreta retorna uma exceção
    if (!matched) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Usuário ou senha incorretos.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return userDB;
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.userId };

    return {
      acess_token: this.jwtService.sign(payload),
    };
  }
}
