import { HttpException, HttpStatus } from '@nestjs/common';
import { Request, NextFunction } from 'express';

export function isValidUser(req: Request, _res: Response, next: NextFunction) {
  const { name, email, password, roles } = req.body;

  // caso algum campo não seja informado, retorna uma exceção
  if (!name || !email || !password || !roles) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Todos os campos devem ser preenchidos.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  next();
}

export function isValidEmail(req: Request, _res: Response, next: NextFunction) {
  const { email } = req.body;

  // expressão regular para validar se o email está no formato correto.
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;

  const validEmail = emailRegex.test(email);

  if (!validEmail) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Insira um email válido.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  next();
}
