import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class validateLogin implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const { email, password } = req.body;

    // busca um usuário no banco de dados.
    const userDB = await this.usersService.findByEmail(email);
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

    next();
  }
}
